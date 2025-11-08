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
  Alert,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import axios from 'axios';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      // API call to backend - Mock implementation
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transaction history. Please try again.');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return <CheckCircleIcon fontSize="small" />;
      case 'pending':
        return <PendingIcon fontSize="small" />;
      case 'failed':
        return <ErrorIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const getPaymentMethodLabel = (method) => {
    const labels = {
      ach: 'ACH/Bank',
      card: 'Credit/Debit Card',
      paypal: 'PayPal'
    };
    return labels[method.toLowerCase()] || method;
  };

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    const statusMatch = filterStatus === 'all' || transaction.status.toLowerCase() === filterStatus;
    const methodMatch = filterMethod === 'all' || transaction.paymentMethod.toLowerCase() === filterMethod;
    return statusMatch && methodMatch;
  });

  // Calculate summary statistics
  const totalAmount = filteredTransactions.reduce((sum, t) => 
    t.status.toLowerCase() === 'success' ? sum + t.amount : sum, 0
  );
  const successCount = filteredTransactions.filter(t => t.status.toLowerCase() === 'success').length;
  const pendingCount = filteredTransactions.filter(t => t.status.toLowerCase() === 'pending').length;
  const failedCount = filteredTransactions.filter(t => t.status.toLowerCase() === 'failed').length;

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
        Transaction History
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        View all payment transactions and their statuses
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Total Collected
              </Typography>
              <Typography variant="h5" color="success.main">
                ${totalAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Successful
              </Typography>
              <Typography variant="h5" color="success.main">
                {successCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Pending
              </Typography>
              <Typography variant="h5" color="warning.main">
                {pendingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Failed
              </Typography>
              <Typography variant="h5" color="error.main">
                {failedCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Filter by Payment Method"
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
            >
              <MenuItem value="all">All Methods</MenuItem>
              <MenuItem value="ach">ACH/Bank</MenuItem>
              <MenuItem value="card">Credit/Debit Card</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Transaction Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Transaction ID</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Stylist</strong></TableCell>
              <TableCell align="right"><strong>Amount</strong></TableCell>
              <TableCell><strong>Payment Method</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {transaction.transactionId}
                    </Typography>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.stylistName}</TableCell>
                  <TableCell align="right">
                    <strong>${transaction.amount.toFixed(2)}</strong>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getPaymentMethodLabel(transaction.paymentMethod)} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      icon={getStatusIcon(transaction.status)}
                      label={transaction.status} 
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {transaction.notes || '-'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box py={4}>
                    <Typography color="text.secondary">
                      No transactions found matching the selected filters.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {transactions.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">
            No transactions yet. Process payments to see transaction history.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default TransactionHistory;
