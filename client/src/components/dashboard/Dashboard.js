import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import './Dashboard.css';

import FieldForm from '../general/FieldForm';
import AddExpenseForm from '../general/AddExpenseForm';
import ExpenseSummary from './Summary/ExpenseSummary';
import BudgetWheel from './BudgetWheel';
import Chart from './Chart';
import RecentExpenses from './Recent/RecentExpenses';
import Message from '../general/Message';
import Overlay from '../general/Overlay';

import { addCategory } from '../../store/actions/categories';
import { addLocation } from '../../store/actions/locations';
import { addSource } from '../../store/actions/sources';
import { deleteExpense, editExpense } from '../../store/actions/expenses';
import { addMessage } from '../../store/actions/messages';

const Dashboard = () => {
  const lastFilter = localStorage.getItem('lastFilter') ? localStorage.getItem('lastFilter') : 'WEEK';
  const [filter, changeFilter] = useState(lastFilter);
  const [fieldToAdd, setFieldToAdd] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddField = field => {
    switch (field.type) {
      case 'category':
        dispatch(addCategory(field));
        break;
      case 'location':
        dispatch(addLocation(field));
        break;
      case 'source':
        dispatch(addSource(field));
        break;
      default:
        break;
    }
  };

  const handleAddFieldClick = type => {
    setFieldToAdd(type);
    history.push('/dashboard/add-field');
  };

  const { expenses, categories, locations, sources, user } = useSelector(state => ({
    expenses: state.expenses,
    categories: state.categories,
    locations: state.locations,
    sources: state.sources,
    user: state.user
  }));

  const { showCategories, showLocations, showSources } = user.userdata;
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
            <AddExpenseForm
              showAddFieldButton={true}
              handleAddFieldClick={handleAddFieldClick}
              closeOverlay={history.goBack}
            />
          </Overlay>
        </Route>

        <Route path="/dashboard/add-field">
          <Overlay closeOverlay={history.goBack}>
            <FieldForm type={fieldToAdd} handleSubmit={handleAddField} closeOverlay={history.goBack} />
          </Overlay>
        </Route>

        <button id="new-expense-btn" onClick={() => history.push('/dashboard/add-expense')}>
          Add Expense
        </button>

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
          deleteExpense={id => dispatch(deleteExpense(id))}
          editExpense={newExpense => dispatch(editExpense(newExpense))}
          expenses={expenses}
          categories={categories}
          locations={locations}
          sources={sources}
          userdata={user.userdata}
          addMessage={message => dispatch(addMessage(message))}
        />

        <button className="floating-button" onClick={() => history.push('/dashboard/add-expense')}>
          +
        </button>
      </main>
    );
  else return <Redirect to="/setup" />;
};

export default Dashboard;
