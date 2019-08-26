import React from 'react';
import moment from 'moment';
import '../../../css/RecentExpenses.css';

import DetailedExpense from './DetailedExpense';

const RecentExpenses = props => {
  const { expenses, categories, sources, locations } = props.expenses;

  const expenseDays = [];

  expenses.forEach(expense => {
    const expenseDay = moment(expense.date).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM'
    });

    // Find out if day is already in array and store it in a variable.
    let dayFromArrayIndex = null;
    const dayFromArray = expenseDays.find((arrayDay, index) => {
      if (arrayDay.day === expenseDay) {
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

      expenseDays[dayFromArrayIndex] = {
        day: expenseDay,
        dayValue: dayFromArray.dayValue + Number(expense.value),
        expenses: updatedExpenses
      };
    } else {
      expenseDays.push({
        day: expenseDay,
        dayValue: Number(expense.value),
        expenses: [expense]
      });
    }
  });

  const days = expenseDays.map(currentDay => {
    return (
      <div className="expense-day" key={currentDay.day}>
        <div className="day-info flex-group">
          <h3 className="expense-day">{currentDay.day}</h3>
          <h4 className="day-price">{currentDay.value}</h4>
        </div>

        {currentDay.expenses.map(expense => (
          <DetailedExpense
            key={`expense-${expense.id}`}
            expense={expense}
            deleteExpense={props.deleteExpense}
            categories={categories}
            sources={sources}
            locations={locations}
          />
        ))}
      </div>
    );
  });

  return <section id="recent-expenses">{days.splice(0, 6)}</section>;
};

export default RecentExpenses;
