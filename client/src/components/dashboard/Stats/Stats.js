import React, { useState } from 'react';
import FILTERS from '../../../constants/filters';
import '../../../css/Stats.css';

import ExpenseSummary from './Summary/ExpenseSummary';
import BudgetWheel from './BudgetWheel';
import Chart from './Chart';
import RecentExpenses from './Recent/RecentExpenses';
import Message from '../../Message';

const Stats = props => {
  const { expenses, user, deleteExpense } = props;

  const lastFilter = localStorage.getItem('lastFilter') ? localStorage.getItem('lastFilter') : FILTERS.WEEK;
  const [filter, changeFilter] = useState(lastFilter);

  if (expenses.expenses.length) {
    return (
      <section id="stats">
        <div className="flex-group chart-and-summary">
          <div className="flex-group summary-and-wheel">
            <ExpenseSummary expenses={expenses} userdata={user.userdata} filter={filter} changeFilter={changeFilter} />
            <BudgetWheel expenses={expenses} userdata={user.userdata} filter={filter} />
          </div>

          <Chart expenses={expenses} />
        </div>

        <RecentExpenses
          deleteExpense={deleteExpense}
          expenses={expenses}
          userdata={user.userdata}
          setMessage={props.setMessage}
        />
      </section>
    );
  } else {
    return <Message message='Please add at least one expense before viewing your stats.' />;
  }
};

export default Stats;
