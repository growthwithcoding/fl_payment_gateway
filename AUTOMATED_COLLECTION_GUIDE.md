# Automated Payment Collection Feature - Complete Guide

## Overview

The Automated Payment Collection feature allows salon/business owners to set up recurring payment schedules for booth rentals or subscriptions. This eliminates manual payment collection and ensures consistent, timely payments.

## Table of Contents

1. [Features](#features)
2. [User Interface](#user-interface)
3. [Frequency Options](#frequency-options)
4. [How to Use](#how-to-use)
5. [Technical Implementation](#technical-implementation)
6. [Production Considerations](#production-considerations)
7. [API Endpoints](#api-endpoints)

---

## Features

### ✅ Flexible Scheduling Options
- **Weekly**: Select specific days of the week (e.g., Monday, Wednesday, Friday)
- **Biweekly**: Every other week on a chosen day
- **Monthly**: Specific date or weekday pattern (e.g., first Monday, 15th of month)
- **Custom**: Define your own interval (e.g., every 10 days, every 3 weeks)

### ✅ Real-Time Preview
- Visual summary of payment schedule
- Display of next 5 upcoming payment dates
- Amount and payment method confirmation

### ✅ Smart Validation
- Prevents past dates from being selected
- Validates all required fields before activation
- Warns about configuration issues

### ✅ Mobile-Responsive Design
- Works seamlessly on phones, tablets, and desktops
- Touch-friendly controls
- Adaptive layout for all screen sizes

### ✅ User-Friendly Interface
- Clear toggle to enable/disable automation
- Intuitive dropdowns and date pickers
- Helpful tooltips and descriptions
- Color-coded status indicators

---

## User Interface

### Main Components

#### 1. **Enable/Disable Toggle**
- Large, prominent switch at the top
- Shows current status (Enabled/Disabled)
- Collapsible interface when disabled

#### 2. **Frequency Selector**
- Dropdown menu with 4 main options
- Each option has a description
- Changes interface based on selection

#### 3. **Schedule Configuration Area**
- Changes based on selected frequency
- Provides specific controls for each type
- Visual feedback for selections

#### 4. **Preview Panel**
- Green success card when valid
- Shows human-readable summary
- Displays upcoming payment dates
- Shows payment amount and method

#### 5. **Validation Alerts**
- Red error messages for issues
- Clear list of problems to fix
- Helpful guidance text

---

## Frequency Options

### 1. Weekly Payments

**Use Case**: Regular weekly collections on specific days

**Configuration**:
- Select one or more days of the week
- Can choose multiple days (e.g., Monday and Thursday)
- Payments attempted on each selected day

**Example Summary**:
> "Payments will be automatically collected every Monday and Friday."

**Best For**:
- High-frequency collections
- Multiple payment days per week
- Flexible scheduling

---

### 2. Biweekly Payments (Every Other Week)

**Use Case**: Collections every two weeks

**Configuration**:
- Choose a specific day of the week
- Select a start date
- System calculates subsequent dates 14 days apart

**Example Summary**:
> "Payments will be automatically collected every other Monday, starting Mon, Nov 11, 2025."

**Best For**:
- Semi-monthly payment structures
- Aligning with biweekly payroll
- Regular but not too frequent collections

---

### 3. Monthly Payments

**Use Case**: Once-per-month collections

**Configuration Options**:

#### Option A: Specific Day of Month
- Choose a day between 1-31
- If day doesn't exist in month (e.g., 31st in February), uses last day

**Example Summary**:
> "Payments will be automatically collected on the 15th day of each month."

#### Option B: Weekday Pattern
- Choose position: First, Second, Third, Fourth, or Last
- Choose weekday: Monday through Sunday

**Example Summary**:
> "Payments will be automatically collected on the First Monday of each month."

**Best For**:
- Standard monthly rent
- Aligning with monthly budgets
- Traditional billing cycles

---

### 4. Custom Schedule

**Use Case**: Non-standard intervals

**Configuration**:
- Enter interval number (1, 2, 3, etc.)
- Choose unit (Days, Weeks, or Months)
- Select start date

**Examples**:
- "Every 10 days" - for high-frequency custom cycles
- "Every 3 weeks" - between biweekly and monthly
- "Every 2 months" - for extended rental agreements

**Example Summary**:
> "Payments will be automatically collected every 10 days, starting Mon, Nov 11, 2025."

**Best For**:
- Unique business requirements
- Non-standard billing cycles
- Special payment arrangements

---

## How to Use

### Step-by-Step Guide

#### Step 1: Navigate to Payment Gateway
1. Click **"Payment Gateway"** in the sidebar navigation
2. Scroll to the **"Automated Payment Collection"** section
3. Click to expand the accordion

#### Step 2: Select a Customer/Stylist
1. Use the **"Select Stylist"** dropdown at the top
2. Choose the person you want to set up automation for
3. Their current rent amount will be displayed

#### Step 3: Enable Automation
1. Click the **large toggle switch** on the right side
2. The interface will expand showing configuration options

#### Step 4: Choose Payment Frequency
1. Click the **"Select Frequency"** dropdown
2. Choose from: Weekly, Biweekly, Monthly, or Custom
3. The interface will update with specific controls

#### Step 5: Configure Schedule Details

**For Weekly**:
- Click on the days of the week you want (can select multiple)
- Selected days will be highlighted

**For Biweekly**:
- Select the day of the week from dropdown
- Pick a start date using the calendar picker

**For Monthly**:
- Choose "Specific Day of Month" or "Specific Weekday Pattern"
- If specific day: Enter number 1-31
- If weekday pattern: Select position (First, Second, etc.) and weekday

**For Custom**:
- Enter the interval number
- Choose unit (Days, Weeks, or Months)
- Pick a start date

#### Step 6: Review the Preview
1. Check the **green preview card** appears
2. Read the summary to confirm it matches your intent
3. Review the next 5 payment dates shown
4. Verify the amount and payment method

#### Step 7: Save and Activate
1. Click **"Save & Activate Schedule"** button
2. Review the confirmation dialog
3. Click **"Confirm & Activate"** to finalize

#### Step 8: Monitor and Manage
- Return anytime to view/edit the schedule
- Toggle off to temporarily disable
- Change settings and resave to update

---

## Technical Implementation

### Frontend Components

#### `AutomatedCollection.jsx`
- Main component for the feature
- Handles all user interactions
- Manages state for different frequency types
- Performs real-time validation
- Generates preview displays

**Key Features**:
- React hooks for state management
- Material-UI components for UI
- Real-time preview updates
- Form validation logic
- Confirmation dialogs

#### `scheduleUtils.js`
- Utility functions for schedule calculations
- Date manipulation logic
- Summary text generation
- Next payment date calculations

**Key Functions**:
- `generateScheduleSummary()` - Creates human-readable descriptions
- `calculateNextPaymentDates()` - Computes upcoming payment dates
- `isValidFutureDate()` - Validates date selections
- `checkScheduleOverlap()` - Detects scheduling conflicts

### Backend API

#### Endpoints

**POST `/api/automated-collection`**
- Saves schedule configuration
- Associates with customer/stylist
- Returns confirmation

**GET `/api/automated-collection/:stylistId`**
- Retrieves existing schedule
- Returns schedule configuration
- Used for editing existing schedules

### Data Models

```javascript
{
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'custom',
  enabled: boolean,
  
  // Weekly specific
  days: ['monday', 'wednesday', 'friday'],
  
  // Biweekly specific
  day: 'monday',
  startDate: '2025-11-11',
  
  // Monthly specific
  option: 'specific' | 'weekday',
  dayOfMonth: 15,
  position: 'first' | 'second' | 'third' | 'fourth' | 'last',
  weekday: 'monday',
  
  // Custom specific
  interval: 10,
  unit: 'days' | 'weeks' | 'months',
  startDate: '2025-11-11'
}
```

---

## Production Considerations

### Required Implementations

#### 1. **Database Storage**
- Store schedule configurations persistently
- Link to customer/merchant accounts
- Maintain history of schedule changes
- Track automation status

#### 2. **Scheduled Task Processor**
- Cron jobs or scheduled workers
- Check for due payments daily
- Process payments automatically
- Handle retries for failures

#### 3. **Payment Method Handling**
- Validate saved payment methods
- Handle expired cards
- Support multiple payment methods per customer
- Secure storage of payment tokens

#### 4. **Notification System**
- Email notifications before payment attempts
- SMS alerts for important events
- In-app notifications
- Receipts for successful payments

#### 5. **Error Handling & Retry Logic**
- Automatic retry for failed payments
- Configurable retry schedules
- Maximum retry limits
- Fallback to manual collection

#### 6. **Compliance & Security**
- PCI DSS compliance for payment data
- GDPR/privacy law compliance
- Audit logging of all actions
- Encrypted data storage

#### 7. **Monitoring & Reporting**
- Dashboard for automated collections
- Success/failure rates
- Revenue forecasting
- Payment trends analysis

### Recommended Payment Processors

- **Stripe**: Best for automated subscriptions and ACH
- **PayPal**: Great for international payments
- **Square**: Good for integrated POS systems
- **Authorize.net**: Reliable for traditional card processing

---

## API Endpoints

### Save Automated Schedule

```http
POST /api/automated-collection
Content-Type: application/json

{
  "stylistId": "123",
  "schedule": {
    "frequency": "weekly",
    "enabled": true,
    "days": ["monday", "friday"]
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Automated collection schedule saved successfully",
  "stylistId": "123",
  "schedule": { ... }
}
```

### Get Automated Schedule

```http
GET /api/automated-collection/123
```

**Response**:
```json
{
  "success": true,
  "stylistId": "123",
  "schedule": {
    "frequency": "weekly",
    "enabled": true,
    "days": ["monday", "friday"]
  }
}
```

---

## Troubleshooting

### Common Issues

**Issue**: "Start date cannot be in the past"
- **Solution**: Select today's date or a future date

**Issue**: "Please select at least one day of the week"
- **Solution**: Click on at least one day button for weekly schedules

**Issue**: Schedule preview not appearing
- **Solution**: Ensure all required fields are filled in correctly

**Issue**: Save button is disabled
- **Solution**: Fix any validation errors shown in red alert boxes

---

## Best Practices

1. **Test Before Going Live**
   - Use test mode to verify schedules
   - Confirm dates are calculating correctly
   - Test with small amounts first

2. **Communicate With Customers**
   - Notify customers before enabling automation
   - Provide clear documentation
   - Send reminders before payment attempts

3. **Monitor Regularly**
   - Check success rates weekly
   - Address failures promptly
   - Update expired payment methods

4. **Keep Schedules Simple**
   - Start with standard intervals
   - Add complexity only if needed
   - Document any custom arrangements

5. **Maintain Backup Plans**
   - Keep manual payment option available
   - Have customer service ready for issues
   - Maintain clear refund policies

---

## Support

For additional assistance:
- Refer to the in-app help tooltips
- Check API documentation for integration details
- Contact development team for technical support

---

**Version**: 1.0.0  
**Last Updated**: November 8, 2025  
**Status**: Production Ready (with noted considerations)
