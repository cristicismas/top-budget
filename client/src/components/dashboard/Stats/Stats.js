import React from 'react';
import '../../../css/Stats.css';

import ExpenseSummary from './ExpenseSummary';
import BudgetWheel from './BudgetWheel';

const Stats = props => {
  const { expenses, user } = props;

  return (
    <section id="stats">
      <div className="flex-group">
        <ExpenseSummary expenses={expenses} userdata={user.userdata} />
        <BudgetWheel expenses={expenses} userdata={user.userdata} />
      </div>
    </section>
  );
}

export default Stats;
