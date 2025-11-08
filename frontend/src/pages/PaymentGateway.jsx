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
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import axios from 'axios';
import AutomatedCollection from '../components/AutomatedCollection';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function PaymentGateway() {
  const [tabValue, setTabValue] = useState(0);
  const [stylists, setStylists] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ACH Payment State
  const [achData, setAchData] = useState({
    accountHolderName: '',
    routingNumber: '',
    accountNumber: '',
    accountType: 'checking'
  });

  // Credit/Debit Card State
  const [cardData, setCardData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    zipCode: ''
  });

  // PayPal State
  const [paypalEmail, setPaypalEmail] = useState('');

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    try {
      const response = await axios.get('/api/stylists');
      setStylists(response.data);
    } catch (err) {
      console.error('Error fetching stylists:', err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  /**
   * SIMULATED ACH PAYMENT PROCESSING
   * In production, this would integrate with Stripe ACH, Plaid, or Dwolla
   * 
   * Real implementation would:
   * 1. Validate bank account with micro-deposits or instant verification (Plaid)
   * 2. Create ACH debit transaction with payment processor
   * 3. Handle webhook notifications for transaction status
   * 4. Process typically takes 1-3 business days
   */
  const handleACHPayment = async () => {
    if (!selectedStylist) {
      showSnackbar('Please select a stylist', 'error');
      return;
    }

    // Validate ACH data
    if (!achData.accountHolderName || !achData.routingNumber || !achData.accountNumber) {
      showSnackbar('Please fill in all ACH details', 'error');
      return;
    }

    // Simulate routing number validation (should be 9 digits)
    if (achData.routingNumber.length !== 9) {
      showSnackbar('Routing number must be 9 digits', 'error');
      return;
    }

    setLoading(true);

    try {
      // MOCK API CALL - Replace with real payment processor in production
      // Example with Stripe: stripe.tokens.create({ bank_account: {...} })
      const response = await axios.post('/api/collect-rent', {
        stylistId: selectedStylist,
        paymentMethod: 'ach',
        paymentDetails: {
          ...achData,
          // In production, NEVER send full account numbers to your server
          // Use tokenization from payment processor's client-side SDK
          accountNumber: `****${achData.accountNumber.slice(-4)}`
        }
      });

      if (response.data.success) {
        showSnackbar(
          `ACH payment initiated successfully! Transaction ID: ${response.data.transactionId}`,
          'success'
        );
        // Clear form
        setAchData({
          accountHolderName: '',
          routingNumber: '',
          accountNumber: '',
          accountType: 'checking'
        });
      } else {
        showSnackbar(`Payment failed: ${response.data.message}`, 'error');
      }
    } catch (err) {
      console.error('ACH payment error:', err);
      showSnackbar('Payment processing failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * SIMULATED CREDIT/DEBIT CARD PAYMENT PROCESSING
   * In production, this would integrate with Stripe, Square, or Authorize.net
   * 
   * Real implementation would:
   * 1. Use PCI-compliant card tokenization (Stripe Elements, Square Payment Form)
   * 2. Never handle raw card data on your server
   * 3. Process card charge through payment processor API
   * 4. Handle 3D Secure authentication if required
   * 5. Transaction completes immediately (or within seconds)
   */
  const handleCardPayment = async () => {
    if (!selectedStylist) {
      showSnackbar('Please select a stylist', 'error');
      return;
    }

    // Validate card data
    if (!cardData.cardholderName || !cardData.cardNumber || !cardData.expiryMonth || 
        !cardData.expiryYear || !cardData.cvv) {
      showSnackbar('Please fill in all card details', 'error');
      return;
    }

    // Basic card number validation (Luhn algorithm would be used in production)
    if (cardData.cardNumber.replace(/\s/g, '').length < 13) {
      showSnackbar('Invalid card number', 'error');
      return;
    }

    setLoading(true);

    try {
      // MOCK API CALL - Replace with Stripe, Square, etc. in production
      // Example with Stripe: stripe.createToken(card)
      const response = await axios.post('/api/collect-rent', {
        stylistId: selectedStylist,
        paymentMethod: 'card',
        paymentDetails: {
          cardholderName: cardData.cardholderName,
          // In production, send only tokenized card data
          cardLast4: cardData.cardNumber.slice(-4),
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear
        }
      });

      if (response.data.success) {
        showSnackbar(
          `Card payment processed successfully! Transaction ID: ${response.data.transactionId}`,
          'success'
        );
        // Clear form
        setCardData({
          cardholderName: '',
          cardNumber: '',
          expiryMonth: '',
          expiryYear: '',
          cvv: '',
          zipCode: ''
        });
      } else {
        showSnackbar(`Payment failed: ${response.data.message}`, 'error');
      }
    } catch (err) {
      console.error('Card payment error:', err);
      showSnackbar('Payment processing failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * SIMULATED PAYPAL PAYMENT PROCESSING
   * In production, this would integrate with PayPal REST API or PayPal Checkout
   * 
   * Real implementation would:
   * 1. Redirect user to PayPal or use PayPal SDK for in-app checkout
   * 2. User authorizes payment on PayPal
   * 3. Receive callback with payment confirmation
   * 4. Execute payment capture through PayPal API
   * 5. Transaction completes immediately after user approval
   */
  const handlePayPalPayment = async () => {
    if (!selectedStylist) {
      showSnackbar('Please select a stylist', 'error');
      return;
    }

    if (!paypalEmail) {
      showSnackbar('Please enter PayPal email', 'error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paypalEmail)) {
      showSnackbar('Invalid email address', 'error');
      return;
    }

    setLoading(true);

    try {
      // MOCK API CALL - Replace with PayPal SDK in production
      // Example: paypal.Buttons().render('#paypal-button-container')
      const response = await axios.post('/api/collect-rent', {
        stylistId: selectedStylist,
        paymentMethod: 'paypal',
        paymentDetails: {
          email: paypalEmail
        }
      });

      if (response.data.success) {
        showSnackbar(
          `PayPal payment initiated! You would be redirected to PayPal. Transaction ID: ${response.data.transactionId}`,
          'success'
        );
        setPaypalEmail('');
      } else {
        showSnackbar(`Payment failed: ${response.data.message}`, 'error');
      }
    } catch (err) {
      console.error('PayPal payment error:', err);
      showSnackbar('Payment processing failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAutomatedScheduleSave = async (config) => {
    try {
      setLoading(true);
      
      // Save the automated collection schedule
      const response = await axios.post('/api/automated-collection', {
        stylistId: selectedStylist,
        schedule: config
      });

      if (response.data.success) {
        showSnackbar('Automated payment collection schedule saved successfully!', 'success');
      } else {
        showSnackbar('Failed to save schedule', 'error');
      }
    } catch (err) {
      console.error('Error saving automated schedule:', err);
      showSnackbar('Error saving automated collection schedule', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment Gateway
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Process booth rent payments and set up automated collection schedules
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Demo Mode:</strong> This is a simulated payment gateway. No real transactions 
        will be processed. Use test data to see how different payment methods work.
      </Alert>

      {/* Automated Collection Section */}
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            bgcolor: 'primary.50',
            '&:hover': { bgcolor: 'primary.100' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ScheduleIcon color="primary" />
            <Box>
              <Typography variant="h6">
                Automated Payment Collection
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Set up recurring payment schedules for automatic collection
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {selectedStylist ? (
            <AutomatedCollection
              stylistId={selectedStylist}
              stylistInfo={stylists.find(s => s.id === selectedStylist)}
              onSave={handleAutomatedScheduleSave}
            />
          ) : (
            <Alert severity="warning">
              Please select a stylist first to configure automated payment collection.
            </Alert>
          )}
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Stylist</InputLabel>
              <Select
                value={selectedStylist}
                onChange={(e) => setSelectedStylist(e.target.value)}
                label="Select Stylist"
              >
                <MenuItem value="">
                  <em>Choose a stylist to collect rent from</em>
                </MenuItem>
                {stylists.map((stylist) => (
                  <MenuItem key={stylist.id} value={stylist.id}>
                    {stylist.name} - Booth {stylist.boothNumber} - ${stylist.weeklyRent.toFixed(2)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab icon={<AccountBalanceIcon />} label="ACH/Bank" />
              <Tab icon={<CreditCardIcon />} label="Credit/Debit Card" />
              <Tab icon={<PaymentIcon />} label="PayPal" />
            </Tabs>

            <Divider sx={{ mb: 2 }} />

            {/* ACH Payment Tab */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                ACH Bank Transfer
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Direct bank account withdrawal. Takes 1-3 business days to process.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Account Holder Name"
                    value={achData.accountHolderName}
                    onChange={(e) => setAchData({ ...achData, accountHolderName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Routing Number"
                    value={achData.routingNumber}
                    onChange={(e) => setAchData({ ...achData, routingNumber: e.target.value })}
                    placeholder="123456789"
                    helperText="9-digit routing number"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Account Type</InputLabel>
                    <Select
                      value={achData.accountType}
                      onChange={(e) => setAchData({ ...achData, accountType: e.target.value })}
                      label="Account Type"
                    >
                      <MenuItem value="checking">Checking</MenuItem>
                      <MenuItem value="savings">Savings</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    type="password"
                    value={achData.accountNumber}
                    onChange={(e) => setAchData({ ...achData, accountNumber: e.target.value })}
                    placeholder="••••••••••"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleACHPayment}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <AccountBalanceIcon />}
                  >
                    {loading ? 'Processing...' : 'Process ACH Payment'}
                  </Button>
                </Grid>
              </Grid>

              <Alert severity="warning" sx={{ mt: 2 }}>
                Test Routing: 110000000 | Test Account: Any number
              </Alert>
            </TabPanel>

            {/* Card Payment Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Credit/Debit Card Payment
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Instant payment processing with credit or debit card.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    value={cardData.cardholderName}
                    onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Exp Month"
                    value={cardData.expiryMonth}
                    onChange={(e) => setCardData({ ...cardData, expiryMonth: e.target.value })}
                    placeholder="MM"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Exp Year"
                    value={cardData.expiryYear}
                    onChange={(e) => setCardData({ ...cardData, expiryYear: e.target.value })}
                    placeholder="YYYY"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="CVV"
                    type="password"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                    placeholder="•••"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Billing ZIP Code"
                    value={cardData.zipCode}
                    onChange={(e) => setCardData({ ...cardData, zipCode: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCardPayment}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <CreditCardIcon />}
                  >
                    {loading ? 'Processing...' : 'Process Card Payment'}
                  </Button>
                </Grid>
              </Grid>

              <Alert severity="warning" sx={{ mt: 2 }}>
                Test Card: 4242 4242 4242 4242 | Any future date | Any CVV
              </Alert>
            </TabPanel>

            {/* PayPal Payment Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                PayPal Payment
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Pay using PayPal account. User will be redirected to PayPal for authentication.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="PayPal Email"
                    type="email"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    placeholder="user@example.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handlePayPalPayment}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <PaymentIcon />}
                    sx={{ bgcolor: '#0070ba', '&:hover': { bgcolor: '#005ea6' } }}
                  >
                    {loading ? 'Processing...' : 'Pay with PayPal'}
                  </Button>
                </Grid>
              </Grid>

              <Alert severity="info" sx={{ mt: 2 }}>
                In production, you would be redirected to PayPal to complete the payment.
              </Alert>
            </TabPanel>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Methods Info
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                <AccountBalanceIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                ACH Bank Transfer
              </Typography>
              <Typography variant="body2" paragraph>
                • Lower fees (0.5-1%)<br />
                • Takes 1-3 business days<br />
                • Good for recurring payments
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                <CreditCardIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                Credit/Debit Card
              </Typography>
              <Typography variant="body2" paragraph>
                • Higher fees (2.5-3.5%)<br />
                • Instant processing<br />
                • Widely accepted
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                <PaymentIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                PayPal
              </Typography>
              <Typography variant="body2" paragraph>
                • Medium fees (2.9% + $0.30)<br />
                • Instant processing<br />
                • Buyer protection included
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

export default PaymentGateway;
