# Quick Start: Automated Payment Collection

## 🚀 Fast Setup Guide (2 Minutes)

### What You Get
Automatic recurring payments with flexible schedules:
- ✅ Weekly (any days)
- ✅ Every other week  
- ✅ Monthly (date or weekday)
- ✅ Custom intervals

### Setup in 3 Steps

#### 1️⃣ Enable Feature
```
Navigate: Payment Gateway → Automated Payment Collection
Toggle: Click the switch to "Enabled"
```

#### 2️⃣ Pick Schedule
```
Frequency: Choose Weekly/Biweekly/Monthly/Custom
Configure: Set days/dates based on your choice
```

#### 3️⃣ Activate
```
Preview: Review the green summary box
Save: Click "Save & Activate Schedule"
Confirm: Accept the confirmation dialog
```

## 📅 Schedule Examples

### Example 1: Every Monday
```
Frequency: Weekly
Days: Monday
Result: "Payments collected every Monday"
```

### Example 2: Every Other Friday
```
Frequency: Biweekly
Day: Friday
Start Date: Nov 15, 2025
Result: "Payments collected every other Friday, starting Nov 15, 2025"
```

### Example 3: First of the Month
```
Frequency: Monthly
Pattern: Specific Day
Day: 1
Result: "Payments collected on the 1st day of each month"
```

### Example 4: First Monday of Month
```
Frequency: Monthly
Pattern: Weekday Pattern
Position: First
Weekday: Monday
Result: "Payments collected on the First Monday of each month"
```

### Example 5: Every 10 Days
```
Frequency: Custom
Interval: 10
Unit: Days
Start Date: Nov 11, 2025
Result: "Payments collected every 10 days, starting Nov 11, 2025"
```

## 🎨 UI Components

### Main Toggle
- **Location**: Top right of Automated Collection section
- **Purpose**: Enable/disable automation
- **Visual**: Large switch with status text

### Frequency Dropdown
- **Options**: 4 main frequency types
- **Dynamic**: Changes interface based on selection
- **Helper Text**: Each option has description

### Day Selector (Weekly)
- **Type**: Multi-select toggle buttons
- **Mobile**: 2 columns on phone, full width on desktop
- **Selection**: Blue highlight when active

### Date Picker (Biweekly/Custom)
- **Type**: Native date input
- **Validation**: Prevents past dates
- **Format**: Standard calendar widget

### Preview Card
- **Color**: Green with success icon
- **Content**: Human-readable summary + next 5 dates
- **Info**: Shows amount and payment method

## ⚠️ Common Mistakes to Avoid

❌ **Don't** select start dates in the past
✅ **Do** use today or future dates

❌ **Don't** forget to select at least one day (weekly)
✅ **Do** choose one or more days from the buttons

❌ **Don't** skip reviewing the preview
✅ **Do** check the green summary matches your intent

❌ **Don't** forget to click Save & Activate
✅ **Do** confirm your settings to activate

## 🔧 Troubleshooting

### "Start date cannot be in the past"
**Fix**: Choose today's date or later

### "Please select at least one day"
**Fix**: Click at least one day button (weekly mode)

### Preview not showing
**Fix**: Fill all required fields

### Save button disabled
**Fix**: Fix red validation errors first

## 📱 Mobile Tips

- Scroll down to see all options
- Use landscape for easier date picking
- Day buttons stack nicely on mobile
- Preview fits full width automatically

## 🎯 Best Practices

1. **Start Simple** - Use standard weekly/monthly first
2. **Test First** - Verify with small amounts
3. **Communicate** - Tell customers about automation
4. **Monitor** - Check success rates regularly
5. **Have Backup** - Keep manual payment option available

## 🔗 Need More Help?

- **Full Guide**: See `AUTOMATED_COLLECTION_GUIDE.md`
- **Technical Docs**: Check component files for API details
- **Support**: Contact your development team

---

**Remember**: You can always edit or disable the schedule later!
