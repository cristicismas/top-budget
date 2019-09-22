import FILTERS from '../constants/filters';
import moment from 'moment';

export const belongsToTimeline = (expense, filter) => {
  const today = moment();
  const expenseDate = moment(expense.date);

  const diffDays = today.diff(expenseDate, 'days');

  let daysToFilter = 0;

  if (FILTERS[filter] === FILTERS.WEEK) daysToFilter = 7;
  else if (FILTERS[filter] === FILTERS.MONTH) daysToFilter = 30;
  else daysToFilter = 356;

  return diffDays < daysToFilter;
};
