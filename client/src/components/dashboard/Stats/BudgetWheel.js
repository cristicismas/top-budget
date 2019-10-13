import React from 'react';
import ICON from '../../../constants/icons';
import Icon from '../../general/Icon';
import './BudgetWheel.css';

import { getCurrency } from '../../../utils/currency';
import {
  getFillPercentage,
  getSumOfExpensesForTimeline,
  getWheelGeometryData,
  getBudgetForFilter
} from '../../../utils/wheel';

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
          {currencySymbol} {Math.round(sumOfExpenses)}
        </span>
        / {Math.round(budgetForFilter)}
      </p>

      <Icon icon={wheelIcon} size={60} fill={wheelColor} className="wheel-icon" />

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
