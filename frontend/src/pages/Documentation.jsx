import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Documentation() {
  const [expanded, setExpanded] = useState('panel-automation');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        📚 User Guide & Documentation
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Everything you need to know about managing your salon booth rental payments
      </Typography>

      {/* NEW FEATURE ALERT */}
      <Alert 
        severity="success" 
        icon={<StarIcon />}
        sx={{ mb: 3, fontSize: '1.1rem', fontWeight: 'bold' }}
      >
        🎉 NEW FEATURE: Automated Payment Collection is now available! Set up recurring payments 
        and never worry about manual collection again.
      </Alert>

      {/* AUTOMATED PAYMENT COLLECTION - FEATURED */}
      <Accordion 
        expanded={expanded === 'panel-automation'} 
        onChange={handleAccordionChange('panel-automation')}
        sx={{ 
          mb: 2,
          border: '2px solid',
          borderColor: 'success.main',
          boxShadow: 3
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{
            bgcolor: 'success.50',
            '&:hover': { bgcolor: 'success.100' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AutorenewIcon color="success" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.dark' }}>
                ⭐ Automated Payment Collection
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Set it and forget it - automatic recurring payments made easy
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {/* What It Does */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon color="primary" />
                  What Does Automated Collection Do?
                </Typography>
                <Typography paragraph>
                  Instead of manually collecting rent payments every week or month, you can now set up 
                  <strong> automatic payment schedules</strong>. The system will automatically attempt to 
                  collect payments on the days you choose, saving you time and ensuring you never miss a payment.
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  Think of it like a subscription service - set it up once, and payments happen automatically!
                </Typography>
              </Paper>
            </Grid>

            {/* Schedule Options */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                <ScheduleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Choose Your Payment Schedule
              </Typography>
              <Grid container spacing={2}>
                {/* Weekly */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'primary.main' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Weekly
                        </Typography>
                      </Box>
                      <Typography variant="body2" paragraph>
                        <strong>Best for:</strong> Regular weekly collections
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>How it works:</strong> Choose one or more days of the week 
                        (like Monday, Friday, or both). Payments will be collected on those days every week.
                      </Typography>
                      <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                        <strong>Example:</strong> "Collect payment every Monday and Thursday"
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Biweekly */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'secondary.main' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarTodayIcon color="secondary" sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Every Other Week
                        </Typography>
                      </Box>
                      <Typography variant="body2" paragraph>
                        <strong>Best for:</strong> Bi-weekly payment cycles
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>How it works:</strong> Pick a day of the week and a start date. 
                        Payments will be collected every two weeks on that day.
                      </Typography>
                      <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                        <strong>Example:</strong> "Collect payment every other Friday"
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Monthly */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'success.main' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarTodayIcon color="success" sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Monthly
                        </Typography>
                      </Box>
                      <Typography variant="body2" paragraph>
                        <strong>Best for:</strong> Standard monthly rent
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>How it works:</strong> Choose either a specific date (like the 1st or 15th) 
                        OR a weekday pattern (like "first Monday of the month").
                      </Typography>
                      <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                        <strong>Examples:</strong> "1st of each month" or "First Monday each month"
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Custom */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%', borderLeft: '4px solid', borderColor: 'warning.main' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarTodayIcon color="warning" sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Custom Schedule
                        </Typography>
                      </Box>
                      <Typography variant="body2" paragraph>
                        <strong>Best for:</strong> Unique payment arrangements
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>How it works:</strong> Set your own interval - every X days, weeks, or months. 
                        Perfect for non-standard agreements.
                      </Typography>
                      <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                        <strong>Examples:</strong> "Every 10 days" or "Every 3 weeks"
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* How to Set It Up */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'info.50', borderRadius: 2, mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  🚀 How to Set Up Automated Payments (In 3 Easy Steps)
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="1" color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<strong>Go to Payment Gateway Page</strong>}
                      secondary="Click 'Payment Gateway' in the sidebar menu"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="2" color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<strong>Find Automated Collection Section</strong>}
                      secondary="Look for the green 'Automated Payment Collection' accordion at the top - click to expand it"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="3" color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<strong>Configure and Activate</strong>}
                      secondary="Select a stylist, toggle the switch ON, choose your schedule, review the preview, and click 'Save & Activate'"
                    />
                  </ListItem>
                </List>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <strong>That's it!</strong> The system will now automatically collect payments on your chosen schedule. 
                  You'll see a preview of the next 5 payment dates before you activate.
                </Alert>
              </Paper>
            </Grid>

            {/* Benefits */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                <AttachMoneyIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Why Use Automated Collection?
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <CheckCircleIcon color="success" />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Save Time
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        No more manual payment collection every week
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <CheckCircleIcon color="success" />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Never Miss a Payment
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Automatic reminders and collection on schedule
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <CheckCircleIcon color="success" />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Consistent Cash Flow
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Predictable income on your chosen dates
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <CheckCircleIcon color="success" />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Easy to Manage
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Turn on/off or edit schedules anytime
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Quick Tips */}
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  💡 Quick Tips:
                </Typography>
                <Typography variant="body2" component="div">
                  • You can enable/disable automation anytime with the toggle switch<br />
                  • The preview shows you exactly when the next 5 payments will occur<br />
                  • You can edit or change the schedule whenever needed<br />
                  • Each stylist can have their own unique payment schedule
                </Typography>
              </Alert>
            </Grid>

            {/* Call to Action */}
            <Grid item xs={12}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  mt: 2
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Ready to Automate Your Payments?
                </Typography>
                <Typography variant="body2" paragraph>
                  Head to the Payment Gateway page to set up your first automated schedule!
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                  onClick={() => window.location.href = '/payment-gateway'}
                >
                  Go to Payment Gateway →
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* PAYMENT METHODS */}
      <Accordion expanded={expanded === 'panel-methods'} onChange={handleAccordionChange('panel-methods')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AttachMoneyIcon sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Payment Methods</Typography>
            <Typography variant="body2" color="text.secondary">
              Understanding your payment options
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            The system supports three popular payment methods, each with its own benefits:
          </Typography>

          <Grid container spacing={2}>
            {/* ACH */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    🏦 ACH / Bank Transfer
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Processing Time:</strong> 1-3 business days
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Typical Fees:</strong> 0.5% - 1%
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Best For:</strong> Recurring payments, lower fees
                  </Typography>
                  <Box sx={{ bgcolor: 'success.50', p: 1, borderRadius: 1 }}>
                    <Typography variant="body2">
                      ✅ <strong>Lowest cost option</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Credit Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    💳 Credit/Debit Card
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Processing Time:</strong> Instant
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Typical Fees:</strong> 2.5% - 3.5% + $0.30
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Best For:</strong> Quick payments, flexibility
                  </Typography>
                  <Box sx={{ bgcolor: 'info.50', p: 1, borderRadius: 1 }}>
                    <Typography variant="body2">
                      ✅ <strong>Instant processing</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* PayPal */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    💰 PayPal
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Processing Time:</strong> Instant
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Typical Fees:</strong> 2.9% + $0.30
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Best For:</strong> Buyer protection, trust
                  </Typography>
                  <Box sx={{ bgcolor: 'warning.50', p: 1, borderRadius: 1 }}>
                    <Typography variant="body2">
                      ✅ <strong>Buyer protection included</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Current Status:</strong> This is a demonstration system with simulated payments. 
              For real payment processing, integration with services like Stripe, Square, or PayPal is required.
            </Typography>
          </Alert>
        </AccordionDetails>
      </Accordion>

      {/* RENT TYPES */}
      <Accordion expanded={expanded === 'panel-rent'} onChange={handleAccordionChange('panel-rent')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CalendarTodayIcon sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Rent Calculation Methods</Typography>
            <Typography variant="body2" color="text.secondary">
              Fixed amount vs. percentage-based rent
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'primary.main' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    📊 Fixed Weekly Rent
                  </Typography>
                  <Typography variant="body2" paragraph>
                    The stylist pays the same amount every week, regardless of their sales.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Example:</strong> $200 per week
                  </Typography>
                  <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Best For:
                    </Typography>
                    <Typography variant="body2">
                      • Predictable income<br />
                      • Simple accounting<br />
                      • Established stylists
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'secondary.main' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    📈 Percentage-Based Rent
                  </Typography>
                  <Typography variant="body2" paragraph>
                    The stylist pays a percentage of their weekly sales revenue.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Example:</strong> 30% of weekly revenue
                  </Typography>
                  <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Best For:
                    </Typography>
                    <Typography variant="body2">
                      • New stylists<br />
                      • Variable income levels<br />
                      • Commission-style agreements
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Note:</strong> For percentage-based rent, you'll need to integrate with your salon's 
              point-of-sale (POS) system to automatically track revenue. Popular options include Square, 
              Vagaro, and Booksy.
            </Typography>
          </Alert>
        </AccordionDetails>
      </Accordion>

      {/* GETTING STARTED */}
      <Accordion expanded={expanded === 'panel-start'} onChange={handleAccordionChange('panel-start')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <StarIcon sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Getting Started Guide</Typography>
            <Typography variant="body2" color="text.secondary">
              Your first steps with the system
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Quick Start in 5 Steps
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Chip label="1" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary={<strong>Add Your Stylists</strong>}
                secondary="Go to Dashboard and add each stylist with their booth number and rent amount"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="2" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary={<strong>Set Rent Amounts</strong>}
                secondary="Use the 'Edit Rent' page to configure fixed or percentage-based rent for each stylist"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="3" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary={<strong>Set Up Automated Payments (Optional)</strong>}
                secondary="Go to Payment Gateway and configure automatic payment schedules"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="4" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary={<strong>Collect Payments</strong>}
                secondary="Use the Payment Gateway to collect rent manually or let automation handle it"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="5" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary={<strong>Track History</strong>}
                secondary="View all transactions and payment status in the Transaction History page"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* NEED HELP */}
      <Box sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            ❓ Need More Help?
          </Typography>
          <Typography variant="body2" paragraph>
            For detailed technical documentation, integration guides, and troubleshooting:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Check the README.md file in your project folder"
                secondary="Contains full technical documentation"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Read AUTOMATED_COLLECTION_GUIDE.md"
                secondary="Complete guide for the automation feature"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="See QUICK_START_AUTOMATED_PAYMENTS.md"
                secondary="Quick reference for automated payments"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export default Documentation;
