import React from 'react';
import { useLocation } from 'react-router';
import { Link, Redirect, Route } from 'react-router-dom';
import './Dashboard.css';

import Stats from './Stats/Stats';
import AddExpenseForm from './AddExpense/AddExpenseForm';

const Dashboard = props => {
  const { user } = props;

  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  if (token) {
    return (
      <section id="dashboard">
        <nav>
          <Link
            to="/dashboard"
            className={!pathname.includes('settings') && !pathname.includes('stats') ? 'active' : null}>
            Add Expense
          </Link>

          <Link to="/dashboard/stats" className={pathname.includes('stats') ? 'active' : null}>
            Stats
          </Link>
        </nav>

        <Route exact path="/dashboard">
          <AddExpenseForm addMessage={props.addMessage} user={user} />
        </Route>

        <Route path="/dashboard/stats">
          <Stats user={user} addMessage={props.addMessage} />
        </Route>
      </section>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Dashboard;
