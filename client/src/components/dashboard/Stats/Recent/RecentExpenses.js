import React, { useState } from 'react';
import { getDaysInChronologicalOrder, formatDate } from '../../../../utils/recent';
import './RecentExpenses.css';

import DetailedExpense from './DetailedExpense';
import EditExpenseField from './EditExpenseModal';
import Overlay from '../../../general/Overlay';

const RecentExpenses = props => {
  const { expenses, categories, sources, locations, userdata } = props;

  const [daysToShow, changeDaysToShow] = useState(7);
  const [expenseToEdit, changeExpenseToEdit] = useState(null);

  const allDays = getDaysInChronologicalOrder(expenses);

  const days = allDays.map(currentDay => {
    const formattedDate = formatDate(currentDay.day);

    return (
      <div className="expense-day" key={formattedDate}>
        <div className="day-info flex-group">
          <h3 className="expense-day">{formattedDate}</h3>
          <h4 className="day-price">{currentDay.value}</h4>
        </div>

        <div className="detailed-expenses">
          {currentDay.expenses.map(expense => (
            <DetailedExpense
              key={`expense-${expense.id}`}
              expense={expense}
              deleteExpense={props.deleteExpense}
              categories={categories}
              sources={sources}
              locations={locations}
              userdata={props.userdata}
              addMessage={props.addMessage}
              onClick={() => changeExpenseToEdit(expense)}
            />
          ))}
        </div>
      </div>
    );
  });

  return (
    <section id="recent-expenses">
      <section className="days">{days.slice(0, daysToShow)}</section>

      {expenseToEdit && (
        <Overlay closeOverlay={() => changeExpenseToEdit(null)}>
          <EditExpenseField
            closeOverlay={() => changeExpenseToEdit(null)}
            addMessage={props.addMessage}
            editExpense={props.editExpense}
            categories={categories}
            locations={locations}
            sources={sources}
            userdata={userdata}
            expense={expenseToEdit}
          />
        </Overlay>
      )}

      {allDays.length > daysToShow ? (
        <button onClick={() => changeDaysToShow(daysToShow + 7)} id="show-more">
          Show more
        </button>
      ) : null}
    </section>
  );
};

export default RecentExpenses;
