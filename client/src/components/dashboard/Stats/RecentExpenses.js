import React from 'react';
import { getRecentDays, formatDate } from '../../../utils/recent';
import '../../../css/RecentExpenses.css';

import DetailedExpense from './DetailedExpense';

const RecentExpenses = props => {
  const { expenses, categories, sources, locations } = props.expenses;

  const recentDays = getRecentDays(expenses);

  const days = recentDays.map(currentDay => {
    const formattedDate = formatDate(currentDay.day);

    return (
      <div className="expense-day" key={formattedDate}>
        <div className="day-info flex-group">
          <h3 className="expense-day">{formattedDate}</h3>
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
