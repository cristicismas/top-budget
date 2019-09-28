import React, { useState } from 'react';
import { getRecentDays, formatDate } from '../../../../utils/recent';
import '../../../../css/RecentExpenses.css';

import DetailedExpense from './DetailedExpense';

const RecentExpenses = props => {
  const { expenses, categories, sources, locations } = props;

  const [daysToShow, changeDaysToShow] = useState(7);

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
            userdata={props.userdata}
            setMessage={props.setMessage}
          />
        ))}
      </div>
    );
  });

  return (
    <section id="recent-expenses">
      {days.slice(0, daysToShow)}

      {recentDays.length > daysToShow ? (
        <button onClick={() => changeDaysToShow(daysToShow + 7)} id="show-more">
          Show more
        </button>
      ) : null}
    </section>
  );
};

export default RecentExpenses;
