import moment from 'moment';

export const convertHexToRgb = hex => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `${r}, ${g}, ${b}`;
};

const belongsToDate = (expense, date) => {
  const expenseDate = moment(expense.date);

  if (moment(date).isSame(expenseDate, 'day')) {
    return true;
  }
};

export const getCategoryValues = (category, expenses) => {
  let values = [];
  const days = getLastSevenDays();

  if (category) {
    expenses.forEach(expense => {
      days.forEach((day, index) => {
        if (isNaN(values[index])) {
          values[index] = 0;
        }

        if (expense.category === category.id && belongsToDate(expense, day)) {
          values[index] += expense.value;
        }
      });
    });
  } else {
    expenses.forEach(expense => {
      days.forEach((day, index) => {
        if (isNaN(values[index])) {
          values[index] = 0;
        }

        if (!expense.category && belongsToDate(expense, day)) {
          values[index] += expense.value;
        }
      });
    });
  }

  return values;
};

export const getLastSevenDays = () => {
  const days = [];

  for (let i = 0; i < 7; i++) {
    const newDate = moment().subtract(i, 'days');
    days.push(newDate);
  }
  return days;
};