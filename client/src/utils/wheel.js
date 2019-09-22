import FILTERS from '../constants/filters';
import moment from 'moment';

export const getSumOfExpensesForTimeline = (expenses, filter) => {
  let sumOfExpenses = 0;

  expenses.forEach(expense => {
    if (belongsToTimeline(expense, filter)) {
      sumOfExpenses += expense.value;
    }
  });

  return sumOfExpenses;
};

export const getFillPercentage = (sumOfExpenses, budget) => {
  let progress = 0;

  if (budget) {
    progress = (sumOfExpenses / budget) * 100;
    if (progress > 100) progress = 100;
  }

  return progress;
};

export const getWheelGeometryData = progress => {
  const radius = 70;
  const stroke = 7;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return {
    radius,
    stroke,
    normalizedRadius,
    circumference,
    strokeDashoffset
  }
};

const belongsToTimeline = (expense, filter) => {
  const today = moment();
  const expenseDate = moment(expense.date);

  const diffDays = today.diff(expenseDate, 'days');

  let daysToFilter = 0;

  if (FILTERS[filter] === FILTERS.WEEK) daysToFilter = 7;
  else if (FILTERS[filter] === FILTERS.MONTH) daysToFilter = 30;
  else daysToFilter = 356;

  return diffDays < daysToFilter;
};
