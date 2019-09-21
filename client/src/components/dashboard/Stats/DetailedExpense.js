import React from 'react';
import moment from 'moment';

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

  const rightSideStyles =
    !showLocations && !showSources
      ? {
          position: 'relative',
          top: '-40px',
          right: '60px'
        }
      : null;

  const stylesForExpense =
    !showLocations && !showSources
      ? {
          marginBottom: '-20px'
        }
      : null;

  const stylesForDetails =
    !showLocations && !showSources
      ? {
          flexWrap: 'nowrap'
        }
      : null;

  return (
    <div className="expense-for-date" style={stylesForExpense}>
      <div className="expense-info flex-group">
        <div className="expense-time">{expenseTime}</div>

        {showCategories && <ExpenseField field={category} />}
      </div>

      <div className="expense-details flex-group" style={stylesForDetails}>
        <div className="details-left flex-group">
          {showLocations && <ExpenseField field={location} />}

          {showLocations && showSources ? <div>/</div> : null}

          {showSources && <ExpenseField field={source} />}
        </div>

        <div className="details-right flex-group" style={rightSideStyles}>
          <div className="amount">${expense.value}</div>
          <button className="delete-expense" onClick={() => props.deleteExpense(expense.id)}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedExpense;
