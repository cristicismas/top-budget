import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import './Dashboard.css';

import AddExpenseModal from '../general/AddExpenseModal';
import ExpenseSummary from './Summary/ExpenseSummary';
import BudgetWheel from './BudgetWheel';
import Chart from './Chart';
import RecentExpenses from './Recent/RecentExpenses';
import Message from '../general/Message';
import Overlay from '../general/Overlay';

import { deleteExpense, editExpense } from '../../store/actions/expenses';

const Dashboard = props => {
  const { expenses, categories, locations, sources, user, deleteExpense, editExpense } = props;
  const { showCategories, showLocations, showSources } = user.userdata;

  const lastFilter = localStorage.getItem('lastFilter') ? localStorage.getItem('lastFilter') : 'WEEK';
  const [filter, changeFilter] = useState(lastFilter);

  const history = useHistory();

  const areAnyFieldsEnabled = showCategories || showLocations || showSources;

  if (expenses.length || categories.length || locations.length || sources.length)
    return (
      <main id="dashboard">
        {!areAnyFieldsEnabled && (
          <Message
            text="Please enable at least one field in your settings to see more advanced statistics."
            shouldFadeOut={true}
          />
        )}

        <Route path="/dashboard/add-expense">
          <Overlay closeOverlay={history.goBack}>
            <AddExpenseModal closeOverlay={history.goBack} />
          </Overlay>
        </Route>

        {areAnyFieldsEnabled && (
          <div className="flex-group chart-and-summary">
            <div className="flex-group summary-and-wheel">
              <ExpenseSummary
                expenses={expenses}
                categories={categories}
                locations={locations}
                sources={sources}
                userdata={user.userdata}
                filter={filter}
                changeFilter={changeFilter}
              />

              <BudgetWheel expenses={expenses} userdata={user.userdata} filter={filter} />
            </div>

            <Chart
              expenses={expenses}
              categories={categories}
              locations={locations}
              sources={sources}
              userdata={user.userdata}
            />
          </div>
        )}

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

        <button className="floating-button" onClick={() => history.push('/dashboard/add-expense')}>
          +
        </button>
      </main>
    );
  else return <Redirect to="/setup" />;
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
