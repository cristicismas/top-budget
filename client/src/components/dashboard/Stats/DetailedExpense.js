import React from 'react';
import moment from 'moment';

import ExpenseField from './ExpenseField';

const DetailedExpense = props => {
  const { expense, categories, locations, sources } = props;

  const category = categories.find(category => {
    return category.id === expense.category;
  });

  const location = locations.find(location => {
    return location.id === expense.location;
  });

  const source = sources.find(source => {
    return source.id === expense.source;
  });

  const expenseTime = moment(expense.date).format('h:mm a');

  return (
    <div className="expense-for-date">
      <div className="expense-info flex-group">
        <div className="expense-time">{expenseTime}</div>

        <ExpenseField field={category} />
      </div>

      <div className="expense-details flex-group">
        <div className="details-left flex-group">
          <ExpenseField field={location} />
          /
          <ExpenseField field={source} />
        </div>

        <div className="details-right flex-group">
          <div className="amount">${Number(expense.value)}</div>
          <button className="delete-expense" onClick={() => props.deleteExpense(expense.id)}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedExpense;
