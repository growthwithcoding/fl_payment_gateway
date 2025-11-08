# 💈 Salon Booth Rent Automation

A complete full-stack web application for automating weekly salon booth rent collection with integrated payment gateway support. Built with React, Node.js/Express, and Material UI.

## 🎯 Overview

This application helps salon owners manage booth rentals and automate rent collection from stylists. It features:

- **Dashboard** - View all stylists, booth numbers, rent amounts, and payment status
- **Edit Rent** - Configure rent as fixed amounts or percentage-based calculations
- **Payment Gateway** - Process payments via ACH, Credit/Debit Cards, or PayPal (simulated)
- **Transaction History** - Track all payments with filtering and status indicators
- **Documentation** - Comprehensive guide for integrating real payment processors

## ⚠️ Important Note

**This is a PROTOTYPE with SIMULATED payment processing.** No real payments are processed. The application demonstrates the complete flow and architecture needed for a production system, with detailed documentation on integrating real payment gateways (Stripe, PayPal, Plaid).

## 🚀 Features

### Frontend (React + Material UI)
- ✅ Modern, responsive design
- ✅ Multi-page navigation (Dashboard, Edit Rent, Payment Gateway, Transactions, Documentation)
- ✅ Form validation and error handling
- ✅ Real-time status updates
- ✅ Clean, professional UI components

### Backend (Node.js + Express)
- ✅ RESTful API architecture
- ✅ Mock data endpoints (ready to connect to database)
- ✅ Simulated payment processing
- ✅ Transaction logging
- ✅ Commented code with production integration notes

### Payment Methods
- 💳 **Credit/Debit Cards** - Instant processing (Stripe recommended)
- 🏦 **ACH/Bank Transfer** - Lower fees, 1-3 day processing (Stripe ACH/Plaid recommended)
- 💰 **PayPal** - Instant processing with buyer protection

### Rent Types
- **Fixed Weekly Amount** - Set amount regardless of revenue
- **Percentage-Based** - Calculated from stylist's weekly revenue (requires POS integration)

## ✨ NEW: Automated Payment Collection

This system now includes a powerful **Automated Payment Collection** feature that allows you to set up recurring payment schedules:

- **Multiple Frequencies**: Weekly, Biweekly, Monthly, or Custom intervals
- **Flexible Scheduling**: Choose specific days, dates, or patterns (e.g., "First Monday of the month")
- **Real-Time Preview**: See the next 5 payment dates before activating
- **Smart Validation**: Prevents configuration errors with helpful feedback
- **Mobile-First Design**: Works beautifully on all devices

📖 **Quick Start**: See `QUICK_START_AUTOMATED_PAYMENTS.md`  
📚 **Full Guide**: See `AUTOMATED_COLLECTION_GUIDE.md`

### Available Schedule Types

| Type | Example | Use Case |
|------|---------|----------|
| **Weekly** | Every Monday & Friday | Multiple collections per week |
| **Biweekly** | Every other Monday | Align with payroll cycles |
| **Monthly** | 1st of month OR First Monday | Standard monthly rent |
| **Custom** | Every 10 days | Non-standard intervals |

## 📋 Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor (VS Code recommended)
- Git (for version control)

## 🛠️ Installation & Setup

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd salon-booth-rent-automation

# Or download and extract the ZIP file
```

### 2. Install All Dependencies

We've made this easy with a single command:

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Frontend (React app)
- Backend (Node.js API)

**OR** install manually:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Configure Environment Variables (Optional)

For the demo, no configuration is needed. For production:

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API keys for:
# - Stripe
# - Plaid
# - PayPal
```

## 🏃 Running the Application

### Development Mode (Recommended)

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

### Run Frontend Only

```bash
npm run dev:frontend
```

### Run Backend Only

```bash
npm run dev:backend
```

### Production Build

```bash
# Build frontend for production
npm run build

# Start backend in production mode
npm start
```

## 📱 Using the Application

### 1. Dashboard
- View all stylists and their rent status
- See who has paid, pending, or overdue rent
- Quick overview of booth assignments

### 2. Edit Rent
- Select a stylist
- Choose rent type (Fixed or Percentage)
- Set weekly rent amount
- Save configuration

### 3. Payment Gateway
- Select stylist to collect rent from
- Choose payment method (ACH, Card, or PayPal)
- Fill in payment details (use test data provided)
- Process payment (simulated)

**Test Data:**
- **ACH**: Routing: 110000000, Account: any number
- **Card**: 4242 4242 4242 4242, Any future date, Any CVV
- **PayPal**: Any valid email format

### 4. Transaction History
- View all payment transactions
- Filter by status or payment method
- See transaction details and notes
- Monitor success rate

### 5. Documentation
- Read complete integration guide
- Learn about payment gateway setup
- Review security best practices
- Understand deployment process

## 📂 Project Structure

```
salon-booth-rent-automation/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditRent.jsx
│   │   │   ├── PaymentGateway.jsx
│   │   │   ├── TransactionHistory.jsx
│   │   │   └── Documentation.jsx
│   │   ├── App.jsx             # Main app component with routing
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                     # Node.js/Express backend API
│   ├── server.js               # Main server file with all endpoints
│   └── package.json
│
├── package.json                # Root package.json for scripts
├── .env.example                # Environment variables template
├── .gitignore
└── README.md                   # This file
```

## 🔌 API Endpoints

The backend provides these RESTful endpoints:

### Stylists
- `GET /api/stylists` - Get all stylists
- `GET /api/stylists/:id` - Get specific stylist
- `POST /api/stylists` - Create new stylist
- `PUT /api/stylists/:id` - Update stylist

### Payments
- `POST /api/collect-rent` - Process rent payment (simulated)
- `POST /api/webhook` - Webhook for payment notifications

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get specific transaction

### Health
- `GET /api/health` - Server health check

## 🌐 Deployment

### Vercel (Recommended)

#### Prerequisites
```bash
npm install -g vercel
```

#### Deploy Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard for API URL

#### Deploy Backend

Option 1: Vercel Serverless Functions
- Move backend code to `/api` folder
- Deploy entire project to Vercel

Option 2: Separate Backend Hosting
- Deploy backend to services like:
  - Heroku
  - Railway
  - Render
  - DigitalOcean
  - AWS/Azure/GCP

### Important Deployment Steps

1. **Set Environment Variables**
   - Add all production API keys
   - Configure CORS allowed origins
   - Set NODE_ENV to 'production'

2. **Configure Database**
   - Replace in-memory storage with real database
   - Set up MongoDB, PostgreSQL, or MySQL
   - Run migrations if needed

3. **Enable HTTPS**
   - Essential for payment processing
   - Most hosting platforms provide free SSL

4. **Set Up Payment Webhooks**
   - Configure webhook URLs in Stripe/PayPal dashboards
   - Verify webhook signatures in code

## 🔐 Security & Production Readiness

### Current Implementation (Demo)
- ✅ Simulated payment processing
- ✅ In-memory data storage
- ✅ No authentication
- ✅ CORS enabled for all origins

### Required for Production

#### 1. Payment Gateway Integration
```bash
npm install stripe @stripe/stripe-js
npm install @paypal/checkout-server-sdk
npm install plaid
```

See the **Documentation page** in the app for detailed integration guides.

#### 2. Database
```bash
# MongoDB
npm install mongodb mongoose

# PostgreSQL
npm install pg pg-hstore sequelize
```

#### 3. Authentication
```bash
npm install jsonwebtoken bcryptjs
npm install express-session passport
```

#### 4. Security Enhancements
```bash
npm install helmet express-rate-limit
npm install joi express-validator
```

#### 5. PCI Compliance
- **NEVER** store raw card data
- Use payment processor tokenization
- Maintain PCI DSS compliance
- Regular security audits

## 🎓 Learning Resources

### Payment Gateway Documentation
- [Stripe Documentation](https://stripe.com/docs)
- [PayPal Developer](https://developer.paypal.com/docs/)
- [Plaid Documentation](https://plaid.com/docs/)

### Framework Documentation
- [React](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port already in use
```bash
# Kill process on port 3000 (frontend)
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (backend)
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### API requests failing
- Ensure backend is running on port 5000
- Check proxy configuration in `frontend/vite.config.js`
- Verify CORS is enabled in backend

## 📊 Future Enhancements

Potential features to add:

- [ ] User authentication and authorization
- [ ] Real database integration (MongoDB/PostgreSQL)
- [x] **Automated payment collection scheduling** ✅ **IMPLEMENTED!**
- [ ] Email/SMS notifications for upcoming payments
- [ ] Recurring payment setup
- [ ] Financial reporting and analytics
- [ ] Multi-salon support
- [ ] Mobile app (React Native)
- [ ] Integration with salon management systems (Square, Vagaro, etc.)
- [ ] Stylist self-service portal
- [ ] Automated late payment reminders
- [ ] Tax document generation
- [ ] Payment plan options

## 🤝 Contributing

This is a prototype/demo project. To extend it:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or as a foundation for your own salon management system.

## 💡 Support

For questions or issues:

1. Check the **Documentation page** within the app
2. Review the code comments (extensive notes included)
3. Consult payment gateway documentation
4. Review this README thoroughly

## 🎉 Credits

Built with:
- React 18
- Material UI 5
- Express.js 4
- Vite 5
- Node.js

Created as a demonstration of full-stack development with payment gateway integration for salon booth rent automation.

---

**Remember**: This is a SIMULATION for demonstration and learning. Always use test mode/sandbox credentials when testing real payment integrations, and never process production payments without proper security measures and PCI compliance.

## 🔥 Quick Start Summary

```bash
# 1. Install everything
npm run install-all

# 2. Run the app
npm run dev

# 3. Open browser
# Frontend: http://localhost:3000
# Backend: http://localhost:5000

# 4. Start using the app!
# - View stylists on Dashboard
# - Edit rent amounts
# - Process simulated payments
# - Check transaction history
# - Read integration docs
```

Enjoy building your salon management system! 💈✨
