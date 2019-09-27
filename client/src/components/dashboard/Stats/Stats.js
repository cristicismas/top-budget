import React, { useState } from 'react';
import FILTERS from '../../../constants/filters';
import '../../../css/Stats.css';

import ExpenseSummary from './Summary/ExpenseSummary';
import BudgetWheel from './BudgetWheel';
import Chart from './Chart';
import RecentExpenses from './Recent/RecentExpenses';
import Message from '../../Message';

const Stats = props => {
  const { expenses, categories, locations, sources, user, deleteExpense } = props;
  const { showCategories, showLocations, showSources } = user.userdata ? user.userdata : false;

  const lastFilter = localStorage.getItem('lastFilter') ? localStorage.getItem('lastFilter') : FILTERS.WEEK;
  const [filter, changeFilter] = useState(lastFilter);

  const areAnyFieldsEnabled = showCategories || showLocations || showSources;

  if (expenses.length) {
    return (
      <section id="stats">
        {!areAnyFieldsEnabled && (
          <Message message="Please enable at least one field in your settings to see more advanced statistics." />
        )}

        <div className="flex-group chart-and-summary">
          <div className="flex-group summary-and-wheel">
            {areAnyFieldsEnabled && (
              <ExpenseSummary
                expenses={expenses}
                categories={categories}
                locations={locations}
                sources={sources}
                userdata={user.userdata}
                filter={filter}
                changeFilter={changeFilter}
              />
            )}

            <BudgetWheel expenses={expenses} userdata={user.userdata} filter={filter} />
          </div>

          {areAnyFieldsEnabled && (
            <Chart
              expenses={expenses}
              categories={categories}
              locations={locations}
              sources={sources}
              userdata={user.userdata}
            />
          )}
        </div>

        <RecentExpenses
          deleteExpense={deleteExpense}
          expenses={expenses}
          categories={categories}
          locations={locations}
          sources={sources}
          userdata={user.userdata}
          setMessage={props.setMessage}
        />
      </section>
    );
  } else {
    return <Message message="Please add at least one expense before viewing your stats." />;
  }
};

export default Stats;
