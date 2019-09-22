import { belongsToTimeline } from './time';

export const handleChangeFilter = (filter, changeFilter) => {
  localStorage.setItem('lastFilter', filter);
  changeFilter(filter);
};

export const calculateBarWidth = (categoryValue, topCategoryValue) => {
  const MAX_WIDTH = 250;

  const fillPercentage = (categoryValue * 100) / topCategoryValue;
  const width = MAX_WIDTH / (100 / fillPercentage);

  return width;
};

export const calculateCategoryValue = (category, expenses, filter) => {
  let value = 0;

  // If category.id isn't specified it means the category is not specified.
  if (!category.id) {
    expenses.forEach(expense => {
      if (belongsToTimeline(expense, filter) && !expense.category) {
        value += expense.value;
      }
    });
  } else {
    expenses.forEach(expense => {
      if (expense.category === category.id && belongsToTimeline(expense, filter)) {
        value += expense.value;
      }
    });
  }

  return value;
};
