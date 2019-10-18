import React from 'react';
import moment from 'moment';
import { getCurrency } from '../../../utils/currency';
import './DetailedExpense.css';

import ExpenseField from './ExpenseField';

const DetailedExpense = props => {
  const { expense, categories, locations, sources, userdata } = props;
  const { showCategories, showLocations, showSources } = userdata;

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

  const currency = getCurrency(userdata);

  return (
    <div className="detailed-expense" onClick={props.onClick}>
      <div className="expense-info flex-group">
        <span className="expense-time">{expenseTime}</span>

        {showCategories && <ExpenseField field={category} />}

        {!(showLocations || showSources) ? (
          <div className="details-right flex-group">
            <span className="amount">
              {currency} {expense.value}
            </span>
            <button
              className="delete-expense"
              onClick={e => {
                e.stopPropagation();
                props.deleteExpense(expense.id);
              }}>
              ✕
            </button>
          </div>
        ) : null}
      </div>

      {showLocations || showSources ? (
        <div className="expense-details flex-group">
          <div className="details-left flex-group">
            {showLocations && <ExpenseField field={location} />}

            {showLocations && showSources ? <span>/</span> : null}

            {showSources && <ExpenseField field={source} />}
          </div>

          <div className="details-right flex-group">
            <span className="amount">
              {currency} {expense.value}
            </span>
            <button
              className="delete-expense"
              onClick={e => {
                e.stopPropagation();
                props.deleteExpense(expense.id);
              }}>
              ✕
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DetailedExpense;
