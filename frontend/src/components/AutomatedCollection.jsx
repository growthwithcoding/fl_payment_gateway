import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Chip,
  Card,
  CardContent,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  PlayArrow as PlayArrowIcon,
  Event as EventIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';
import { calculateNextPaymentDates, generateScheduleSummary } from '../utils/scheduleUtils';

function AutomatedCollection({ stylistId, stylistInfo, onSave }) {
  // Main toggle state
  const [isEnabled, setIsEnabled] = useState(false);
  
  // Frequency options: weekly, biweekly, monthly, custom
  const [frequency, setFrequency] = useState('weekly');
  
  // Weekly settings
  const [selectedDays, setSelectedDays] = useState(['monday']);
  
  // Biweekly settings
  const [biweeklyDay, setBiweeklyDay] = useState('monday');
  const [biweeklyStartDate, setBiweeklyStartDate] = useState('');
  
  // Monthly settings
  const [monthlyOption, setMonthlyOption] = useState('specific'); // specific, first, last
  const [monthlyDay, setMonthlyDay] = useState('1'); // Day of month or weekday
  const [monthlyWeekday, setMonthlyWeekday] = useState('monday');
  const [monthlyPosition, setMonthlyPosition] = useState('first'); // first, second, third, fourth, last
  
  // Custom settings
  const [customInterval, setCustomInterval] = useState('7');
  const [customIntervalUnit, setCustomIntervalUnit] = useState('days'); // days, weeks, months
  const [customStartDate, setCustomStartDate] = useState('');
  
  // Preview and validation
  const [scheduleSummary, setScheduleSummary] = useState('');
  const [nextPaymentDates, setNextPaymentDates] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const weekdays = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ];

  // Update schedule preview whenever settings change
  useEffect(() => {
    if (isEnabled) {
      updateSchedulePreview();
    }
  }, [
    isEnabled,
    frequency,
    selectedDays,
    biweeklyDay,
    biweeklyStartDate,
    monthlyOption,
    monthlyDay,
    monthlyWeekday,
    monthlyPosition,
    customInterval,
    customIntervalUnit,
    customStartDate,
  ]);

  const updateSchedulePreview = () => {
    // Clear previous errors
    setValidationErrors([]);
    
    try {
      const config = buildScheduleConfig();
      
      // Validate configuration
      const errors = validateScheduleConfig(config);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setScheduleSummary('');
        setNextPaymentDates([]);
        return;
      }

      // Generate summary text
      const summary = generateScheduleSummary(config);
      setScheduleSummary(summary);

      // Calculate next 5 payment dates
      const dates = calculateNextPaymentDates(config, 5);
      setNextPaymentDates(dates);
    } catch (error) {
      console.error('Error updating schedule preview:', error);
      setValidationErrors(['Error generating schedule preview']);
    }
  };

  const buildScheduleConfig = () => {
    const config = {
      frequency,
      enabled: isEnabled,
    };

    switch (frequency) {
      case 'weekly':
        config.days = selectedDays;
        break;
      case 'biweekly':
        config.day = biweeklyDay;
        config.startDate = biweeklyStartDate;
        break;
      case 'monthly':
        config.option = monthlyOption;
        if (monthlyOption === 'specific') {
          config.dayOfMonth = monthlyDay;
        } else {
          config.position = monthlyPosition;
          config.weekday = monthlyWeekday;
        }
        break;
      case 'custom':
        config.interval = parseInt(customInterval);
        config.unit = customIntervalUnit;
        config.startDate = customStartDate;
        break;
    }

    return config;
  };

  const validateScheduleConfig = (config) => {
    const errors = [];

    switch (config.frequency) {
      case 'weekly':
        if (!config.days || config.days.length === 0) {
          errors.push('Please select at least one day of the week');
        }
        break;
      case 'biweekly':
        if (!config.startDate) {
          errors.push('Please select a start date for biweekly payments');
        } else {
          const startDate = new Date(config.startDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (startDate < today) {
            errors.push('Start date cannot be in the past');
          }
        }
        break;
      case 'monthly':
        if (config.option === 'specific') {
          const day = parseInt(config.dayOfMonth);
          if (isNaN(day) || day < 1 || day > 31) {
            errors.push('Day of month must be between 1 and 31');
          }
        }
        break;
      case 'custom':
        if (!config.interval || config.interval < 1) {
          errors.push('Custom interval must be at least 1');
        }
        if (!config.startDate) {
          errors.push('Please select a start date for custom schedule');
        } else {
          const startDate = new Date(config.startDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (startDate < today) {
            errors.push('Start date cannot be in the past');
          }
        }
        break;
    }

    return errors;
  };

  const handleToggleEnable = (event) => {
    setIsEnabled(event.target.checked);
    if (event.target.checked) {
      setShowPreview(true);
    }
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
    setValidationErrors([]);
  };

  const handleWeekdayToggle = (event, newDays) => {
    if (newDays.length > 0) {
      setSelectedDays(newDays);
    }
  };

  const handleSave = () => {
    const config = buildScheduleConfig();
    const errors = validateScheduleConfig(config);
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setSaveDialogOpen(true);
  };

  const confirmSave = () => {
    const config = buildScheduleConfig();
    onSave(config);
    setSaveDialogOpen(false);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ScheduleIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
                Automated Payment Collection
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Set up automatic recurring payments for {stylistInfo?.name || 'this customer'}
              </Typography>
            </Box>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={isEnabled}
                onChange={handleToggleEnable}
                color="primary"
                size="large"
              />
            }
            label={
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body1" fontWeight="bold">
                  {isEnabled ? 'Enabled' : 'Disabled'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {isEnabled ? 'Automatic collection active' : 'Click to enable'}
                </Typography>
              </Box>
            }
            labelPlacement="start"
          />
        </Box>

        <Collapse in={isEnabled}>
          <Divider sx={{ mb: 3 }} />

          {/* Frequency Selection */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <EventIcon sx={{ mr: 1 }} /> Payment Frequency
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Frequency</InputLabel>
              <Select
                value={frequency}
                onChange={handleFrequencyChange}
                label="Select Frequency"
              >
                <MenuItem value="weekly">
                  <Box>
                    <Typography variant="body1">Weekly</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Choose specific days of the week
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="biweekly">
                  <Box>
                    <Typography variant="body1">Every Other Week (Biweekly)</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Select a day and starting date
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="monthly">
                  <Box>
                    <Typography variant="body1">Monthly</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Choose specific day or weekday pattern
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="custom">
                  <Box>
                    <Typography variant="body1">Custom</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Define your own interval
                    </Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Frequency-Specific Settings */}
          <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
            {/* Weekly Settings */}
            {frequency === 'weekly' && (
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Select Days of the Week
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Choose one or more days when payments should be collected automatically.
                </Typography>
                <ToggleButtonGroup
                  value={selectedDays}
                  onChange={handleWeekdayToggle}
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                    '& .MuiToggleButton-root': {
                      flex: { xs: '1 1 calc(50% - 8px)', sm: '1 1 auto' },
                      minWidth: { xs: 'auto', sm: '100px' },
                    }
                  }}
                >
                  {weekdays.map((day) => (
                    <ToggleButton key={day.value} value={day.value}>
                      {day.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            )}

            {/* Biweekly Settings */}
            {frequency === 'biweekly' && (
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Biweekly Payment Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Payments will be collected every other week on the selected day.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Day of the Week</InputLabel>
                      <Select
                        value={biweeklyDay}
                        onChange={(e) => setBiweeklyDay(e.target.value)}
                        label="Day of the Week"
                      >
                        {weekdays.map((day) => (
                          <MenuItem key={day.value} value={day.value}>
                            {day.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Start Date"
                      value={biweeklyStartDate}
                      onChange={(e) => setBiweeklyStartDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: getTodayDate() }}
                      helperText="First payment will occur on or after this date"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Monthly Settings */}
            {frequency === 'monthly' && (
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Monthly Payment Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Choose how payments should be scheduled each month.
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Monthly Pattern</InputLabel>
                  <Select
                    value={monthlyOption}
                    onChange={(e) => setMonthlyOption(e.target.value)}
                    label="Monthly Pattern"
                  >
                    <MenuItem value="specific">Specific Day of Month</MenuItem>
                    <MenuItem value="weekday">Specific Weekday Pattern</MenuItem>
                  </Select>
                </FormControl>

                {monthlyOption === 'specific' && (
                  <TextField
                    fullWidth
                    type="number"
                    label="Day of Month"
                    value={monthlyDay}
                    onChange={(e) => setMonthlyDay(e.target.value)}
                    inputProps={{ min: 1, max: 31 }}
                    helperText="Choose a day between 1-31. If the day doesn't exist in a month, the last day will be used."
                  />
                )}

                {monthlyOption === 'weekday' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Position</InputLabel>
                        <Select
                          value={monthlyPosition}
                          onChange={(e) => setMonthlyPosition(e.target.value)}
                          label="Position"
                        >
                          <MenuItem value="first">First</MenuItem>
                          <MenuItem value="second">Second</MenuItem>
                          <MenuItem value="third">Third</MenuItem>
                          <MenuItem value="fourth">Fourth</MenuItem>
                          <MenuItem value="last">Last</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Weekday</InputLabel>
                        <Select
                          value={monthlyWeekday}
                          onChange={(e) => setMonthlyWeekday(e.target.value)}
                          label="Weekday"
                        >
                          {weekdays.map((day) => (
                            <MenuItem key={day.value} value={day.value}>
                              {day.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}

            {/* Custom Settings */}
            {frequency === 'custom' && (
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Custom Payment Schedule
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Define your own payment interval and starting date.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Every"
                      value={customInterval}
                      onChange={(e) => setCustomInterval(e.target.value)}
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Unit</InputLabel>
                      <Select
                        value={customIntervalUnit}
                        onChange={(e) => setCustomIntervalUnit(e.target.value)}
                        label="Unit"
                      >
                        <MenuItem value="days">Days</MenuItem>
                        <MenuItem value="weeks">Weeks</MenuItem>
                        <MenuItem value="months">Months</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Start Date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: getTodayDate() }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Alert severity="error" sx={{ mb: 3 }} icon={<WarningIcon />}>
              <Typography variant="subtitle2" gutterBottom>
                Please fix the following issues:
              </Typography>
              <List dense>
                {validationErrors.map((error, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={error} />
                  </ListItem>
                ))}
              </List>
            </Alert>
          )}

          {/* Schedule Preview */}
          {scheduleSummary && validationErrors.length === 0 && (
            <Card sx={{ mb: 3, bgcolor: 'success.50', borderLeft: 4, borderColor: 'success.main' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
                  Schedule Preview
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
                  {scheduleSummary}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <DateRangeIcon sx={{ mr: 1, fontSize: 20 }} />
                  Upcoming Payment Dates:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {nextPaymentDates.map((date, index) => (
                    <Chip
                      key={index}
                      icon={<CalendarIcon />}
                      label={date}
                      color={index === 0 ? 'primary' : 'default'}
                      variant={index === 0 ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>

                {stylistInfo && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Amount:</strong> ${stylistInfo.weeklyRent?.toFixed(2) || '0.00'} per collection
                      <br />
                      <strong>Payment Method:</strong> {stylistInfo.defaultPaymentMethod || 'To be configured'}
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => setIsEnabled(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={handleSave}
              disabled={validationErrors.length > 0 || !scheduleSummary}
            >
              Save & Activate Schedule
            </Button>
          </Box>
        </Collapse>

        {!isEnabled && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Enable automated payment collection to set up recurring payments. This feature allows you to automatically collect payments based on a customizable schedule.
            </Typography>
          </Alert>
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Confirm Automated Payment Schedule</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            You are about to activate automatic payment collection.
          </Alert>
          <Typography variant="body1" paragraph>
            {scheduleSummary}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The system will automatically attempt to collect payments according to this schedule. You can modify or disable this at any time.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmSave} variant="contained" color="primary">
            Confirm & Activate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AutomatedCollection;
