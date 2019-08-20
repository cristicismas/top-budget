import React from 'react';
import '../../../css/BudgetWheel.css';

import CURRENCY from '../../../constants/currencies';
import ICON from '../../../constants/icons';

const BudgetWheel = props => {
  const { userdata } = props;
  const { expenses } = props.expenses;

  // Get currency symbol
  let currencySymbol = '';
  if (userdata) {
    currencySymbol = CURRENCY[userdata.currency].symbol ? CURRENCY[userdata.currency].symbol : userdata.currency;
  }

  // Get sum of expensess per current month
  var sumOfExpensesPerMonth = 0;
  const today = new Date();

  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);

    const diffTime = Math.abs(today.getTime() - expenseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const daysToFilter = 30;

    if (diffDays < daysToFilter) {
      sumOfExpensesPerMonth += Number(expense.value);
    }
  });

  // Get progress wheel percentage
  var progress = 0;

  if (userdata) {
    progress = (sumOfExpensesPerMonth / userdata.budget) * 100;
    if (progress > 100) progress = 100;
  }

  // Calculate wheel geometry
  const radius = 70;
  const stroke = 7;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Get wheel colors and icon by amount spent
  var wheelColor = '';
  var wheelIcon = '';

  if (userdata) {
    if (sumOfExpensesPerMonth < (33 / 100) * userdata.budget) {
      wheelColor = '#aaa';
      wheelIcon = ICON.THUMBS_UP;
    } else if (sumOfExpensesPerMonth < (66 / 100) * userdata.budget) {
      wheelColor = '#f4b92e';
      wheelIcon = ICON.WARNING;
    } else {
      wheelColor = '#ff5500';
      wheelIcon = ICON.FIRE;
    }
  }

  return (
    <div id="budget-wheel">
      <div className="wheel-numbers">
        <div className="spent">
          {currencySymbol} {sumOfExpensesPerMonth}
        </div>
        / {userdata ? userdata.budget : 0}
      </div>

      <svg
        className="wheel-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        fill={wheelColor}
        viewBox="0 0 24 24">
        <path d={wheelIcon} />
      </svg>

      <svg height={radius * 2} width={radius * 2} className="wheel">
        <circle
          id="placeholder-circle"
          stroke="#232323"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: 0 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          id="progress-circle"
          stroke={wheelColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: !isNaN(strokeDashoffset) ? strokeDashoffset : circumference }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  );
};

export default BudgetWheel;
