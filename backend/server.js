/**
 * SALON BOOTH RENT AUTOMATION - BACKEND API
 * 
 * This is a MOCK/SIMULATED backend for demonstration purposes.
 * All data is stored in memory and resets when the server restarts.
 * 
 * FOR PRODUCTION:
 * 1. Replace in-memory data with a real database (MongoDB, PostgreSQL, etc.)
 * 2. Add authentication/authorization middleware
 * 3. Implement real payment gateway integration (Stripe, PayPal, etc.)
 * 4. Add proper error handling and logging
 * 5. Implement data validation
 * 6. Add rate limiting and security measures
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// MOCK DATA STORAGE (In-Memory)
// In production, replace with database queries
// ============================================

let stylists = [
  {
    id: '1',
    name: 'Jessica Martinez',
    boothNumber: 'B-101',
    weeklyRent: 250.00,
    rentType: 'Fixed',
    status: 'Paid',
    lastPayment: '2024-11-04',
    percentageRate: null
  },
  {
    id: '2',
    name: 'Michael Chen',
    boothNumber: 'B-102',
    weeklyRent: 300.00,
    rentType: 'Fixed',
    status: 'Pending',
    lastPayment: '2024-10-28',
    percentageRate: null
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    boothNumber: 'B-103',
    weeklyRent: 275.00,
    rentType: 'Percentage',
    status: 'Paid',
    lastPayment: '2024-11-05',
    percentageRate: 20
  },
  {
    id: '4',
    name: 'David Rodriguez',
    boothNumber: 'B-104',
    weeklyRent: 225.00,
    rentType: 'Fixed',
    status: 'Overdue',
    lastPayment: '2024-10-15',
    percentageRate: null
  }
];

let transactions = [
  {
    id: '1',
    transactionId: 'TXN_20241104_001',
    date: '2024-11-04',
    stylistName: 'Jessica Martinez',
    stylistId: '1',
    amount: 250.00,
    paymentMethod: 'card',
    status: 'Success',
    notes: 'Weekly rent payment'
  },
  {
    id: '2',
    transactionId: 'TXN_20241105_001',
    date: '2024-11-05',
    stylistName: 'Sarah Johnson',
    stylistId: '3',
    amount: 275.00,
    paymentMethod: 'ach',
    status: 'Pending',
    notes: 'ACH transfer initiated'
  },
  {
    id: '3',
    transactionId: 'TXN_20241028_001',
    date: '2024-10-28',
    stylistName: 'Michael Chen',
    stylistId: '2',
    amount: 300.00,
    paymentMethod: 'paypal',
    status: 'Success',
    notes: 'PayPal payment completed'
  },
  {
    id: '4',
    transactionId: 'TXN_20241020_001',
    date: '2024-10-20',
    stylistName: 'David Rodriguez',
    stylistId: '4',
    amount: 225.00,
    paymentMethod: 'card',
    status: 'Failed',
    notes: 'Card declined - insufficient funds'
  }
];

// ============================================
// API ENDPOINTS
// ============================================

/**
 * GET /api/stylists
 * Returns list of all stylists with their rent information
 * 
 * PRODUCTION NOTES:
 * - Add authentication to ensure only authorized salon owners can access
 * - Implement pagination for large datasets
 * - Add filtering and sorting options
 * - Connect to database instead of in-memory array
 */
app.get('/api/stylists', (req, res) => {
  try {
    res.json(stylists);
  } catch (error) {
    console.error('Error fetching stylists:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch stylists' 
    });
  }
});

/**
 * GET /api/stylists/:id
 * Returns a specific stylist by ID
 * 
 * PRODUCTION NOTES:
 * - Validate stylist ID format
 * - Ensure user has permission to view this stylist's data
 */
app.get('/api/stylists/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stylist = stylists.find(s => s.id === id);
    
    if (!stylist) {
      return res.status(404).json({ 
        success: false, 
        message: 'Stylist not found' 
      });
    }
    
    res.json(stylist);
  } catch (error) {
    console.error('Error fetching stylist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch stylist' 
    });
  }
});

/**
 * POST /api/stylists
 * Creates a new stylist
 * 
 * PRODUCTION NOTES:
 * - Implement input validation (required fields, data types)
 * - Add authentication/authorization
 * - Generate unique IDs properly (database auto-increment or UUID)
 * - Save to database
 */
app.post('/api/stylists', (req, res) => {
  try {
    const { name, boothNumber, weeklyRent, rentType, percentageRate } = req.body;
    
    // Basic validation
    if (!name || !boothNumber || !weeklyRent || !rentType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Create new stylist
    const newStylist = {
      id: (stylists.length + 1).toString(),
      name,
      boothNumber,
      weeklyRent: parseFloat(weeklyRent),
      rentType,
      status: 'Pending',
      lastPayment: null,
      percentageRate: rentType === 'Percentage' ? percentageRate : null
    };
    
    stylists.push(newStylist);
    
    res.status(201).json({ 
      success: true, 
      data: newStylist 
    });
  } catch (error) {
    console.error('Error creating stylist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create stylist' 
    });
  }
});

/**
 * PUT /api/stylists/:id
 * Updates an existing stylist's information
 * 
 * PRODUCTION NOTES:
 * - Validate all input data
 * - Add authorization checks
 * - Log all changes for audit trail
 * - Update in database
 */
app.put('/api/stylists/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { rentType, weeklyRent, percentageRate } = req.body;
    
    const stylistIndex = stylists.findIndex(s => s.id === id);
    
    if (stylistIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Stylist not found' 
      });
    }
    
    // Update stylist data
    stylists[stylistIndex] = {
      ...stylists[stylistIndex],
      rentType: rentType || stylists[stylistIndex].rentType,
      weeklyRent: weeklyRent !== undefined ? parseFloat(weeklyRent) : stylists[stylistIndex].weeklyRent,
      percentageRate: percentageRate !== undefined ? parseFloat(percentageRate) : stylists[stylistIndex].percentageRate
    };
    
    res.json({ 
      success: true, 
      data: stylists[stylistIndex] 
    });
  } catch (error) {
    console.error('Error updating stylist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update stylist' 
    });
  }
});

/**
 * POST /api/collect-rent
 * Processes a rent payment (SIMULATED)
 * 
 * PRODUCTION IMPLEMENTATION:
 * This endpoint would integrate with real payment processors:
 * 
 * FOR STRIPE:
 * const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 * const paymentIntent = await stripe.paymentIntents.create({
 *   amount: amount * 100,
 *   currency: 'usd',
 *   payment_method: paymentMethodId,
 *   confirm: true
 * });
 * 
 * FOR PAYPAL:
 * const paypal = require('@paypal/checkout-server-sdk');
 * // Create order and capture payment
 * 
 * FOR ACH (via Stripe or Plaid):
 * // Verify bank account first
 * // Then create ACH charge
 * 
 * SECURITY NOTES:
 * - NEVER process raw card data on your server
 * - Use tokenization from payment processor's client-side SDK
 * - Implement idempotency keys to prevent duplicate charges
 * - Validate webhook signatures from payment processors
 * - Store only last 4 digits of payment methods
 */
app.post('/api/collect-rent', (req, res) => {
  try {
    const { stylistId, paymentMethod, paymentDetails } = req.body;
    
    // Find stylist
    const stylist = stylists.find(s => s.id === stylistId);
    if (!stylist) {
      return res.status(404).json({ 
        success: false, 
        message: 'Stylist not found' 
      });
    }
    
    // Simulate payment processing delay
    // In production, this would be an actual API call to payment processor
    const processingTime = Math.random() * 1000 + 500; // 500-1500ms
    
    setTimeout(() => {
      // Simulate success/failure (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        // Generate transaction ID
        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Create transaction record
        const newTransaction = {
          id: (transactions.length + 1).toString(),
          transactionId,
          date: new Date().toISOString().split('T')[0],
          stylistName: stylist.name,
          stylistId: stylist.id,
          amount: stylist.weeklyRent,
          paymentMethod,
          status: paymentMethod === 'ach' ? 'Pending' : 'Success',
          notes: `${paymentMethod.toUpperCase()} payment processed`
        };
        
        transactions.unshift(newTransaction); // Add to beginning of array
        
        // Update stylist status
        const stylistIndex = stylists.findIndex(s => s.id === stylistId);
        stylists[stylistIndex].status = paymentMethod === 'ach' ? 'Pending' : 'Paid';
        stylists[stylistIndex].lastPayment = newTransaction.date;
        
        res.json({
          success: true,
          transactionId,
          message: 'Payment processed successfully',
          status: newTransaction.status
        });
      } else {
        // Simulate payment failure
        const errorMessages = [
          'Card declined - insufficient funds',
          'Card declined - invalid card number',
          'Bank account verification failed',
          'Payment processor timeout'
        ];
        const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        
        // Still record failed transaction
        const transactionId = `TXN_FAILED_${Date.now()}`;
        const failedTransaction = {
          id: (transactions.length + 1).toString(),
          transactionId,
          date: new Date().toISOString().split('T')[0],
          stylistName: stylist.name,
          stylistId: stylist.id,
          amount: stylist.weeklyRent,
          paymentMethod,
          status: 'Failed',
          notes: errorMessage
        };
        
        transactions.unshift(failedTransaction);
        
        res.status(400).json({
          success: false,
          transactionId,
          message: errorMessage
        });
      }
    }, processingTime);
    
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Payment processing failed' 
    });
  }
});

/**
 * GET /api/transactions
 * Returns all payment transactions
 * 
 * PRODUCTION NOTES:
 * - Add pagination (limit, offset)
 * - Add filtering by date range, stylist, status, payment method
 * - Add sorting options
 * - Query from database instead of in-memory array
 * - Add authorization checks
 */
app.get('/api/transactions', (req, res) => {
  try {
    // In production, you would query database with filters:
    // const { page = 1, limit = 50, stylistId, status, startDate, endDate } = req.query;
    
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch transactions' 
    });
  }
});

/**
 * GET /api/transactions/:id
 * Returns a specific transaction by ID
 */
app.get('/api/transactions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }
    
    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch transaction' 
    });
  }
});

/**
 * POST /api/webhook
 * Webhook endpoint for payment processor notifications
 * 
 * PRODUCTION IMPLEMENTATION:
 * This endpoint receives notifications from payment processors
 * when payment status changes (e.g., ACH clears, card charge succeeds)
 * 
 * EXAMPLE WITH STRIPE:
 * const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 * const sig = req.headers['stripe-signature'];
 * 
 * try {
 *   const event = stripe.webhooks.constructEvent(
 *     req.body,
 *     sig,
 *     process.env.STRIPE_WEBHOOK_SECRET
 *   );
 *   
 *   switch (event.type) {
 *     case 'payment_intent.succeeded':
 *       // Update transaction status in database
 *       break;
 *     case 'payment_intent.payment_failed':
 *       // Handle failure
 *       break;
 *   }
 * } catch (err) {
 *   return res.status(400).send(`Webhook Error: ${err.message}`);
 * }
 */
app.post('/api/webhook', (req, res) => {
  // Mock webhook handler
  console.log('Webhook received:', req.body);
  res.json({ received: true });
});

/**
 * POST /api/automated-collection
 * Saves automated payment collection schedule for a stylist
 * 
 * PRODUCTION NOTES:
 * - Store schedule in database
 * - Set up cron jobs or scheduled tasks to execute payments
 * - Implement retry logic for failed payments
 * - Send notifications before payment attempts
 * - Log all automated payment attempts
 */
app.post('/api/automated-collection', (req, res) => {
  try {
    const { stylistId, schedule } = req.body;
    
    // Validate stylist exists
    const stylist = stylists.find(s => s.id === stylistId);
    if (!stylist) {
      return res.status(404).json({ 
        success: false, 
        message: 'Stylist not found' 
      });
    }
    
    // In production, save schedule to database
    // For demo, we just acknowledge receipt
    console.log(`Automated collection schedule saved for ${stylist.name}:`, schedule);
    
    res.json({
      success: true,
      message: 'Automated collection schedule saved successfully',
      stylistId,
      schedule
    });
  } catch (error) {
    console.error('Error saving automated schedule:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save automated collection schedule' 
    });
  }
});

/**
 * GET /api/automated-collection/:stylistId
 * Retrieves automated payment collection schedule for a stylist
 */
app.get('/api/automated-collection/:stylistId', (req, res) => {
  try {
    const { stylistId } = req.params;
    
    // Validate stylist exists
    const stylist = stylists.find(s => s.id === stylistId);
    if (!stylist) {
      return res.status(404).json({ 
        success: false, 
        message: 'Stylist not found' 
      });
    }
    
    // In production, retrieve from database
    // For demo, return empty schedule
    res.json({
      success: true,
      stylistId,
      schedule: null // Would return actual schedule from database
    });
  } catch (error) {
    console.error('Error fetching automated schedule:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch automated collection schedule' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Salon Booth Rent Automation API is running',
    mode: 'SIMULATION - No real payments processed'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// Only start server if not in Vercel serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║   Salon Booth Rent Automation - Backend API               ║
║                                                            ║
║   Status: RUNNING (SIMULATION MODE)                       ║
║   Port: ${PORT}                                           ║
║   Mode: Development                                        ║
║                                                            ║
║   ⚠️  This is a MOCK implementation                        ║
║   ⚠️  No real payments are processed                       ║
║                                                            ║
║   API Endpoints:                                           ║
║   GET    /api/health                                       ║
║   GET    /api/stylists                                     ║
║   GET    /api/stylists/:id                                 ║
║   POST   /api/stylists                                     ║
║   PUT    /api/stylists/:id                                 ║
║   POST   /api/collect-rent                                 ║
║   GET    /api/transactions                                 ║
║   GET    /api/transactions/:id                             ║
║   POST   /api/webhook                                      ║
╚════════════════════════════════════════════════════════════╝
    `);
  });
}

module.exports = app;
