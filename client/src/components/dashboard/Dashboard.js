import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import '../../css/Dashboard.css';

import Settings from './Settings/Settings';
import Stats from './Stats/Stats';
import AddExpenseForm from './AddExpense/AddExpenseForm';
import Message from '../Message';

import { addMessage, clearMessages } from '../../store/actions/messages';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getExpenses();
    this.props.getCategories();
    this.props.getLocations();
    this.props.getSources();
  }

  render() {
    const { user, messages } = this.props;

    const pathname = this.props.location.pathname;
    const token = localStorage.getItem('token');

    if (token) {
      return (
        <section id="dashboard">
          <nav>
            <Link to="/dashboard/settings" className={pathname === '/dashboard/settings' ? 'active' : null}>
              Settings
            </Link>

            <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : null}>
              Add Expense
            </Link>

            <Link to="/dashboard/stats" className={pathname === '/dashboard/stats' ? 'active' : null}>
              Stats
            </Link>
          </nav>

          {messages.map((message, index) => (
            <Message
              key={`message-${index}`}
              message={message.text}
              type={message.type}
              shouldFadeOut={message.shouldFadeOut}
              clearMessages={this.props.clearMessages}
            />
          ))}

          <Route
            exact
            path="/dashboard"
            render={() => <AddExpenseForm addMessage={this.props.addMessage} user={user} />}
          />

          <Route path="/dashboard/settings" render={() => <Settings user={user} />} />

          <Route path="/dashboard/stats" render={() => <Stats user={user} addMessage={this.props.addMessage} />} />
        </section>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { addMessage, clearMessages }
)(Dashboard);
