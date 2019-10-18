import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';

import AddExpenseModal from './AddExpenseModal';
import ExpenseSummary from './Summary/ExpenseSummary';
import BudgetWheel from './BudgetWheel';
import Chart from './Chart';
import RecentExpenses from './Recent/RecentExpenses';
import Message from '../general/Message';
import Overlay from '../general/Overlay';

import { deleteExpense, editExpense } from '../../store/actions/expenses';

const Dashboard = props => {
  const { expenses, categories, locations, sources, user, deleteExpense, editExpense } = props;
  const { showCategories, showLocations, showSources } = user.userdata ? user.userdata : false;

  const lastFilter = localStorage.getItem('lastFilter') ? localStorage.getItem('lastFilter') : 'WEEK';
  const [filter, changeFilter] = useState(lastFilter);

  const [showAddExpenseOverlay, toggleAddExpenseOverlay] = useState(false);

  const areAnyFieldsEnabled = showCategories || showLocations || showSources;

  return (
    <section id="dashboard">
      {!expenses.length && <Message text="Please add at least one expense before viewing the dashboard." />}

      {!areAnyFieldsEnabled && (
        <Message
          text="Please enable at least one field in your settings to see more advanced statistics."
          shouldFadeOut={true}
        />
      )}

      {showAddExpenseOverlay && (
        <Overlay closeOverlay={() => toggleAddExpenseOverlay(false)}>
          <AddExpenseModal closeOverlay={() => toggleAddExpenseOverlay(false)} />
        </Overlay>
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
        editExpense={editExpense}
        expenses={expenses}
        categories={categories}
        locations={locations}
        sources={sources}
        userdata={user.userdata}
        addMessage={props.addMessage}
      />

      <button className="floating-button" onClick={() => toggleAddExpenseOverlay(true)}>
        +
      </button>
    </section>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  expenses: state.expenses,
  categories: state.categories,
  locations: state.locations,
  sources: state.sources
});

export default connect(
  mapStateToProps,
  { deleteExpense, editExpense }
)(Dashboard);
