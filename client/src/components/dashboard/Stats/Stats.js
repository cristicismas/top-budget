import React from 'react';
import '../../../css/Stats.css';

import ExpenseSummary from './ExpenseSummary';
import BudgetWheel from './BudgetWheel';
import RecentExpenses from './RecentExpenses';
import Message from '../../Message';

const Stats = props => {
  const { expenses, user, deleteExpense } = props;

  if (expenses.expenses.length) {
    return (
      <section id="stats">
        <div className="flex-group">
          <ExpenseSummary expenses={expenses} userdata={user.userdata} />
          <BudgetWheel expenses={expenses} userdata={user.userdata} />
        </div>

        <RecentExpenses deleteExpense={deleteExpense} expenses={expenses} userdata={user.userdata} />
      </section>
    );
  } else {
    return <Message message={'Please add at least one expense before viewing your stats.'} />;
  }
};

export default Stats;
