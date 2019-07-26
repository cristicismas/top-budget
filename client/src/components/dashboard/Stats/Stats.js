import React from 'react';
import '../../../css/Stats.css';

import ExpenseSummary from './ExpenseSummary';

const Stats = props => {
  const { expenses, user } = props;

  return (
    <section id="stats">
      <ExpenseSummary expenses={expenses} userdata={user.userdata} />
    </section>
  );
}

export default Stats;
