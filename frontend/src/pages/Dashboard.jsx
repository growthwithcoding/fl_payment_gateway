import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    try {
      setLoading(true);
      // API call to backend - Replace with real endpoint in production
      const response = await axios.get('/api/stylists');
      setStylists(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stylist data. Please try again.');
      console.error('Error fetching stylists:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Salon Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Overview of all stylists and their booth rental status
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Stylist Name</strong></TableCell>
              <TableCell><strong>Booth Number</strong></TableCell>
              <TableCell align="right"><strong>Weekly Rent</strong></TableCell>
              <TableCell><strong>Rent Type</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Last Payment</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stylists.map((stylist) => (
              <TableRow key={stylist.id} hover>
                <TableCell>{stylist.name}</TableCell>
                <TableCell>{stylist.boothNumber}</TableCell>
                <TableCell align="right">
                  ${stylist.weeklyRent.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={stylist.rentType} 
                    size="small" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={stylist.status} 
                    color={getStatusColor(stylist.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{stylist.lastPayment || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {stylists.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">
            No stylists found. Add stylists to get started.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
