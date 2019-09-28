import moment from 'moment';

export const getDaysInChronologicalOrder = expenses => {
  let recentDays = [];

  expenses.forEach(expense => {
    const expenseDay = moment(expense.date);

    // Find out if day is already in array and store it in a variable.
    let dayFromArrayIndex = null;
    const dayFromArray = recentDays.find((arrayDay, index) => {
      if (formatDate(arrayDay.day) === formatDate(expenseDay)) {
        dayFromArrayIndex = index;
        return true;
      }
      return false;
    });

    if (dayFromArray) {
      // If an expense has been added since last render, compare it to the last expense and
      // add it in the right place in the array.
      const isExpenseNew = moment(expense.date).isAfter(dayFromArray.expenses[0].date);

      let updatedExpenses = [...dayFromArray.expenses, expense];
      if (isExpenseNew) {
        updatedExpenses = [expense, ...dayFromArray.expenses];
      }

      recentDays[dayFromArrayIndex] = {
        day: expenseDay,
        dayValue: dayFromArray.dayValue + expense.value,
        expenses: updatedExpenses
      };
    } else {
      const isDayNew = recentDays[0] ? moment(expense.date).isAfter(recentDays[0].day) : true;

      if (isDayNew) {
        recentDays = [
          {
            day: expenseDay,
            dayValue: expense.value,
            expenses: [expense]
          },
          ...recentDays
        ];
      } else {
        recentDays.push({
          day: expenseDay,
          dayValue: expense.value,
          expenses: [expense]
        });
      }
    }
  });

  return recentDays;
};

export const formatDate = date => {
  return date.calendar(null, {
    sameDay: '[Today]',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM'
  });
}