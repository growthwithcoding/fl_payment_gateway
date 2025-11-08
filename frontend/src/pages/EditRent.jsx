import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

function EditRent() {
  const [stylists, setStylists] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState('');
  const [rentType, setRentType] = useState('fixed');
  const [fixedAmount, setFixedAmount] = useState('');
  const [percentageRate, setPercentageRate] = useState('');
  const [estimatedWeeklyRevenue, setEstimatedWeeklyRevenue] = useState('');
  const [calculatedRent, setCalculatedRent] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchStylists();
  }, []);

  // Calculate rent when percentage-based and revenue changes
  useEffect(() => {
    if (rentType === 'percentage' && percentageRate && estimatedWeeklyRevenue) {
      const calculated = (parseFloat(percentageRate) / 100) * parseFloat(estimatedWeeklyRevenue);
      setCalculatedRent(calculated);
    }
  }, [rentType, percentageRate, estimatedWeeklyRevenue]);

  const fetchStylists = async () => {
    try {
      const response = await axios.get('/api/stylists');
      setStylists(response.data);
    } catch (err) {
      console.error('Error fetching stylists:', err);
      showSnackbar('Failed to fetch stylists', 'error');
    }
  };

  const handleStylistChange = (event) => {
    const stylistId = event.target.value;
    setSelectedStylist(stylistId);
    
    // Pre-fill data for selected stylist
    const stylist = stylists.find(s => s.id === stylistId);
    if (stylist) {
      setRentType(stylist.rentType.toLowerCase());
      if (stylist.rentType.toLowerCase() === 'fixed') {
        setFixedAmount(stylist.weeklyRent.toString());
      } else {
        // For percentage, we'd need to store the rate in the backend
        // For demo purposes, we'll calculate it
        setPercentageRate('20'); // Default percentage
      }
    }
  };

  const handleSaveRent = async () => {
    if (!selectedStylist) {
      showSnackbar('Please select a stylist', 'error');
      return;
    }

    try {
      const updateData = {
        rentType,
        weeklyRent: rentType === 'fixed' 
          ? parseFloat(fixedAmount)
          : calculatedRent,
        percentageRate: rentType === 'percentage' ? parseFloat(percentageRate) : null
      };

      // API call to update stylist rent - Mock implementation
      await axios.put(`/api/stylists/${selectedStylist}`, updateData);
      
      showSnackbar('Rent updated successfully!', 'success');
      fetchStylists(); // Refresh the list
    } catch (err) {
      console.error('Error updating rent:', err);
      showSnackbar('Failed to update rent', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Booth Rent
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Adjust weekly rent amounts for stylists. Choose between fixed rent or percentage-based calculation.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Rent Configuration
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Stylist</InputLabel>
              <Select
                value={selectedStylist}
                onChange={handleStylistChange}
                label="Select Stylist"
              >
                <MenuItem value="">
                  <em>Choose a stylist</em>
                </MenuItem>
                {stylists.map((stylist) => (
                  <MenuItem key={stylist.id} value={stylist.id}>
                    {stylist.name} - Booth {stylist.boothNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Rent Type</FormLabel>
              <RadioGroup
                value={rentType}
                onChange={(e) => setRentType(e.target.value)}
              >
                <FormControlLabel 
                  value="fixed" 
                  control={<Radio />} 
                  label="Fixed Weekly Amount" 
                />
                <FormControlLabel 
                  value="percentage" 
                  control={<Radio />} 
                  label="Percentage of Revenue" 
                />
              </RadioGroup>
            </FormControl>

            {rentType === 'fixed' && (
              <TextField
                fullWidth
                label="Weekly Rent Amount"
                type="number"
                value={fixedAmount}
                onChange={(e) => setFixedAmount(e.target.value)}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                sx={{ mb: 3 }}
              />
            )}

            {rentType === 'percentage' && (
              <>
                <TextField
                  fullWidth
                  label="Percentage Rate"
                  type="number"
                  value={percentageRate}
                  onChange={(e) => setPercentageRate(e.target.value)}
                  InputProps={{
                    endAdornment: <Typography>%</Typography>,
                  }}
                  sx={{ mb: 2 }}
                  helperText="Percentage of weekly revenue"
                />
                <TextField
                  fullWidth
                  label="Estimated Weekly Revenue"
                  type="number"
                  value={estimatedWeeklyRevenue}
                  onChange={(e) => setEstimatedWeeklyRevenue(e.target.value)}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                  sx={{ mb: 2 }}
                  helperText="For calculation purposes"
                />
                {calculatedRent > 0 && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Calculated Weekly Rent: ${calculatedRent.toFixed(2)}
                  </Alert>
                )}
              </>
            )}

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveRent}
              fullWidth
              disabled={!selectedStylist || (rentType === 'fixed' && !fixedAmount) || 
                       (rentType === 'percentage' && (!percentageRate || !estimatedWeeklyRevenue))}
            >
              Save Rent Configuration
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About Rent Types
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Fixed Rent:</strong> A set weekly amount that remains constant 
                regardless of the stylist's revenue. Simple and predictable.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Percentage-Based Rent:</strong> Rent is calculated as a percentage 
                of the stylist's weekly revenue. This aligns the salon's income with the 
                stylist's success.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <em>Note:</em> In a production system, percentage-based rent would be 
                automatically calculated from POS integration data.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EditRent;
