import React from 'react';
import moment from 'moment';
import ICONS from '../../../constants/icons';
import { getCurrency } from '../../../utils/currency';
import './DetailedExpense.css';

import Icon from '../../general/Icon';
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

  const shouldShowCategories = showCategories && categories.length > 0;
  const shouldShowLocations = showLocations && locations.length > 0;
  const shouldShowSources = showSources && sources.length > 0;

  const showDetails = shouldShowLocations || shouldShowSources;

  return (
    <div className="detailed-expense" onClick={props.onClick}>
      <div className="expense-info flex-group">
        <span className="expense-time">{expenseTime}</span>

        {shouldShowCategories && <ExpenseField field={category} />}

        {!showDetails && (
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
        )}
      </div>

      {showDetails && (
        <div className="expense-details flex-group">
          <div className="details-left flex-group">
            {shouldShowLocations && <ExpenseField field={location} />}

            {shouldShowLocations && shouldShowSources && <span>/</span>}

            {shouldShowSources && <ExpenseField field={source} />}
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
              <Icon className="delete-expense-icon" icon={ICONS.CROSS} size={10} fill="#eee" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedExpense;
