import { belongsToTimeline } from './time';

export const handleChangeFilter = (filter, changeFilter) => {
  localStorage.setItem('lastFilter', filter);
  changeFilter(filter);
};

export const calculateBarWidth = (fieldValue, topFieldValue) => {
  const MAX_WIDTH = 250;

  const fillPercentage = (fieldValue * 100) / topFieldValue;
  const width = MAX_WIDTH / (100 / fillPercentage);

  return width;
};

export const calculateFieldValue = (field, fieldType, expenses, filter) => {
  let value = 0;

  // If field.id isn't specified it means the field is not specified.
  if (!field.id) {
    expenses.forEach(expense => {
      if (belongsToTimeline(expense, filter) && !expense[fieldType]) {
        value += expense.value;
      }
    });
  } else {
    expenses.forEach(expense => {
      if (expense[fieldType] === field.id && belongsToTimeline(expense, filter)) {
        value += expense.value;
      }
    });
  }

  return value;
};
