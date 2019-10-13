import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link, Redirect, Route } from 'react-router-dom';
import './Dashboard.css';

import Settings from './Settings/Settings';
import Stats from './Stats/Stats';
import AddExpenseForm from './AddExpense/AddExpenseForm';
import Message from '../general/Message';

import { addMessage, clearMessages } from '../../store/actions/messages';

const Dashboard = props => {
  const { getExpenses, getCategories, getLocations, getSources, user, messages } = props;

  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  // Fetch everything when dashboard mounts.
  useEffect(() => {
    getExpenses();
    getCategories();
    getLocations();
    getSources();
  }, [getExpenses, getCategories, getLocations, getSources]);

  if (token) {
    return (
      <section id="dashboard">
        <nav>
          <Link to="/dashboard/settings" className={pathname.includes('settings') ? 'active' : null}>
            Settings
          </Link>

          <Link
            to="/dashboard"
            className={!pathname.includes('settings') && !pathname.includes('stats') ? 'active' : null}>
            Add Expense
          </Link>

          <Link to="/dashboard/stats" className={pathname.includes('stats') ? 'active' : null}>
            Stats
          </Link>
        </nav>

        {messages.map((message, index) => (
          <Message
            key={`message-${index}`}
            message={message.text}
            type={message.type}
            shouldFadeOut={message.shouldFadeOut}
            clearMessages={props.clearMessages}
          />
        ))}

        <Route exact path="/dashboard">
          <AddExpenseForm addMessage={props.addMessage} user={user} />
        </Route>

        <Route path="/dashboard/settings">
          <Settings user={user} />
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

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { addMessage, clearMessages }
)(Dashboard);
