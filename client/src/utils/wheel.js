import { belongsToTimeline } from './time';
import FILTERS from '../constants/filters';

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
  };
};

export const getBudgetForFilter = (monthlyBudget, filter) => {
  let calculatedBudget = monthlyBudget;

  if (FILTERS[filter] === FILTERS.WEEK) {
    calculatedBudget *= 0.225;
  } else if (FILTERS[filter] === FILTERS.YEAR) {
    calculatedBudget *= 12.16;
  }

  return calculatedBudget;
}
