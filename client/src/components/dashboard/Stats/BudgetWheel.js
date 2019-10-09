import React from 'react';
import { getCurrency } from '../../../utils/currency';
import { getFillPercentage, getSumOfExpensesForTimeline, getWheelGeometryData, getBudgetForFilter } from '../../../utils/wheel';
import ICON from '../../../constants/icons';
import '../../../css/BudgetWheel.css';


const BudgetWheel = props => {
  const { expenses, userdata, filter } = props;

  const currencySymbol = getCurrency(userdata);

  const budgetForFilter = getBudgetForFilter(userdata.budget, filter);
  const sumOfExpenses = getSumOfExpensesForTimeline(expenses, filter);
  const progress = getFillPercentage(sumOfExpenses, budgetForFilter);

  const WHEEL = getWheelGeometryData(progress);

  // Get wheel colors and icon by amount spent
  let wheelColor = '';
  let wheelIcon = '';

  if (userdata) {
    if (sumOfExpenses < (33 / 100) * budgetForFilter) {
      wheelColor = '#aaa';
      wheelIcon = ICON.THUMBS_UP;
    } else if (sumOfExpenses < (66 / 100) * budgetForFilter) {
      wheelColor = '#f4b92e';
      wheelIcon = ICON.WARNING;
    } else {
      wheelColor = '#ff5500';
      wheelIcon = ICON.FIRE;
    }
  }

  return (
    <div id="budget-wheel">
      <p className="wheel-numbers">
        <span className="spent">
          {currencySymbol} {sumOfExpenses}
        </span>
        / {budgetForFilter}
      </p>

      <svg
        className="wheel-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        fill={wheelColor}
        viewBox="0 0 24 24">
        <path d={wheelIcon} />
      </svg>

      <svg height={WHEEL.radius * 2} width={WHEEL.radius * 2} className="wheel">
        <circle
          id="placeholder-circle"
          stroke="#232323"
          fill="transparent"
          strokeWidth={WHEEL.stroke}
          strokeDasharray={WHEEL.circumference + ' ' + WHEEL.circumference}
          style={{ strokeDashoffset: 0 }}
          r={WHEEL.normalizedRadius}
          cx={WHEEL.radius}
          cy={WHEEL.radius}
        />

        <circle
          id="progress-circle"
          stroke={wheelColor}
          fill="transparent"
          strokeWidth={WHEEL.stroke}
          strokeDasharray={WHEEL.circumference + ' ' + WHEEL.circumference}
          style={{ strokeDashoffset: !isNaN(WHEEL.strokeDashoffset) ? WHEEL.strokeDashoffset : WHEEL.circumference }}
          r={WHEEL.normalizedRadius}
          cx={WHEEL.radius}
          cy={WHEEL.radius}
        />
      </svg>
    </div>
  );
};

export default BudgetWheel;
