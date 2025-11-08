/**
 * Schedule Utility Functions
 * Handles all scheduling logic for automated payment collection
 */

/**
 * Generate a human-readable summary of the schedule
 * @param {Object} config - Schedule configuration
 * @returns {string} - Summary text
 */
export function generateScheduleSummary(config) {
  if (!config.enabled) {
    return 'Automated collection is disabled';
  }

  const { frequency } = config;

  switch (frequency) {
    case 'weekly':
      return generateWeeklySummary(config);
    case 'biweekly':
      return generateBiweeklySummary(config);
    case 'monthly':
      return generateMonthlySummary(config);
    case 'custom':
      return generateCustomSummary(config);
    default:
      return 'Invalid schedule configuration';
  }
}

function generateWeeklySummary(config) {
  const { days } = config;
  
  if (!days || days.length === 0) {
    return 'No days selected';
  }

  const dayNames = days.map(day => capitalizeFirst(day));
  
  if (days.length === 1) {
    return `Payments will be automatically collected every ${dayNames[0]}.`;
  } else if (days.length === 2) {
    return `Payments will be automatically collected every ${dayNames[0]} and ${dayNames[1]}.`;
  } else if (days.length === 7) {
    return `Payments will be automatically collected every day.`;
  } else {
    const lastDay = dayNames.pop();
    return `Payments will be automatically collected every ${dayNames.join(', ')}, and ${lastDay}.`;
  }
}

function generateBiweeklySummary(config) {
  const { day, startDate } = config;
  
  if (!startDate) {
    return 'Start date not specified';
  }

  const dayName = capitalizeFirst(day);
  const formattedDate = formatDate(new Date(startDate));
  
  return `Payments will be automatically collected every other ${dayName}, starting ${formattedDate}.`;
}

function generateMonthlySummary(config) {
  const { option, dayOfMonth, position, weekday } = config;

  if (option === 'specific') {
    const day = parseInt(dayOfMonth);
    const suffix = getOrdinalSuffix(day);
    return `Payments will be automatically collected on the ${day}${suffix} day of each month.`;
  } else {
    const positionText = capitalizeFirst(position);
    const weekdayText = capitalizeFirst(weekday);
    return `Payments will be automatically collected on the ${positionText} ${weekdayText} of each month.`;
  }
}

function generateCustomSummary(config) {
  const { interval, unit, startDate } = config;
  
  if (!startDate) {
    return 'Start date not specified';
  }

  const formattedDate = formatDate(new Date(startDate));
  const unitText = interval === 1 ? unit.slice(0, -1) : unit; // Remove 's' if singular
  
  if (interval === 1) {
    return `Payments will be automatically collected every ${unitText}, starting ${formattedDate}.`;
  } else {
    return `Payments will be automatically collected every ${interval} ${unitText}, starting ${formattedDate}.`;
  }
}

/**
 * Calculate the next N payment dates based on schedule configuration
 * @param {Object} config - Schedule configuration
 * @param {number} count - Number of dates to calculate
 * @returns {string[]} - Array of formatted date strings
 */
export function calculateNextPaymentDates(config, count = 5) {
  const { frequency } = config;

  switch (frequency) {
    case 'weekly':
      return calculateWeeklyDates(config, count);
    case 'biweekly':
      return calculateBiweeklyDates(config, count);
    case 'monthly':
      return calculateMonthlyDates(config, count);
    case 'custom':
      return calculateCustomDates(config, count);
    default:
      return [];
  }
}

function calculateWeeklyDates(config, count) {
  const { days } = config;
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekdayMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const selectedDayNumbers = days.map(day => weekdayMap[day]).sort((a, b) => a - b);
  
  let currentDate = new Date(today);
  
  while (dates.length < count) {
    const currentDayOfWeek = currentDate.getDay();
    
    // Check if current day is in selected days
    if (selectedDayNumbers.includes(currentDayOfWeek)) {
      dates.push(formatDate(new Date(currentDate)));
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function calculateBiweeklyDates(config, count) {
  const { day, startDate } = config;
  const dates = [];
  
  const weekdayMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const targetDayOfWeek = weekdayMap[day];
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);

  // Find the first occurrence of the target day on or after start date
  while (currentDate.getDay() !== targetDayOfWeek) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Generate dates every 14 days
  for (let i = 0; i < count; i++) {
    dates.push(formatDate(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 14);
  }

  return dates;
}

function calculateMonthlyDates(config, count) {
  const { option, dayOfMonth, position, weekday } = config;
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentDate = new Date(today);
  currentDate.setDate(1); // Start from first day of current month

  if (option === 'specific') {
    // Specific day of month
    const day = parseInt(dayOfMonth);
    
    for (let i = 0; i < count; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      
      // If the day doesn't exist in the month, use the last day
      if (monthDate.getMonth() !== currentDate.getMonth()) {
        monthDate.setDate(0); // Set to last day of previous month
      }
      
      // Only include if date is today or in the future
      if (monthDate >= today) {
        dates.push(formatDate(monthDate));
      }
      
      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  } else {
    // Weekday pattern (e.g., "first Monday")
    const weekdayMap = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const targetDayOfWeek = weekdayMap[weekday];

    while (dates.length < count) {
      const monthDate = findWeekdayInMonth(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        targetDayOfWeek,
        position
      );

      if (monthDate >= today) {
        dates.push(formatDate(monthDate));
      }

      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  return dates;
}

function calculateCustomDates(config, count) {
  const { interval, unit, startDate } = config;
  const dates = [];
  
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < count; i++) {
    dates.push(formatDate(new Date(currentDate)));

    // Add interval based on unit
    switch (unit) {
      case 'days':
        currentDate.setDate(currentDate.getDate() + interval);
        break;
      case 'weeks':
        currentDate.setDate(currentDate.getDate() + (interval * 7));
        break;
      case 'months':
        currentDate.setMonth(currentDate.getMonth() + interval);
        break;
    }
  }

  return dates;
}

/**
 * Find a specific weekday in a month (e.g., "first Monday", "last Friday")
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @param {number} targetDayOfWeek - Day of week (0-6, Sunday-Saturday)
 * @param {string} position - Position (first, second, third, fourth, last)
 * @returns {Date} - The found date
 */
function findWeekdayInMonth(year, month, targetDayOfWeek, position) {
  if (position === 'last') {
    // Start from the last day of the month and work backwards
    const lastDay = new Date(year, month + 1, 0);
    while (lastDay.getDay() !== targetDayOfWeek) {
      lastDay.setDate(lastDay.getDate() - 1);
    }
    return lastDay;
  } else {
    // Start from the first day of the month
    const firstDay = new Date(year, month, 1);
    
    // Find the first occurrence of the target weekday
    while (firstDay.getDay() !== targetDayOfWeek) {
      firstDay.setDate(firstDay.getDate() + 1);
    }

    // Apply position offset
    const positionMap = {
      first: 0,
      second: 1,
      third: 2,
      fourth: 3,
    };

    const weeksToAdd = positionMap[position] || 0;
    firstDay.setDate(firstDay.getDate() + (weeksToAdd * 7));

    return firstDay;
  }
}

/**
 * Format a date object to a readable string
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string (e.g., "Mon, Nov 11, 2025")
 */
function formatDate(date) {
  const options = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - Input string
 * @returns {string} - Capitalized string
 */
function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 * @param {number} num - Number
 * @returns {string} - Ordinal suffix
 */
function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
}

/**
 * Validate if a date string is valid and not in the past
 * @param {string} dateString - Date string
 * @returns {boolean} - True if valid
 */
export function isValidFutureDate(dateString) {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return date >= today && !isNaN(date.getTime());
}

/**
 * Check if two schedule configurations conflict
 * @param {Object} config1 - First schedule config
 * @param {Object} config2 - Second schedule config
 * @returns {boolean} - True if schedules might overlap
 */
export function checkScheduleOverlap(config1, config2) {
  if (!config1.enabled || !config2.enabled) {
    return false;
  }

  // Get next 10 dates for both schedules
  const dates1 = calculateNextPaymentDates(config1, 10);
  const dates2 = calculateNextPaymentDates(config2, 10);

  // Check for any common dates
  const overlap = dates1.some(date => dates2.includes(date));
  
  return overlap;
}
