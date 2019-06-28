import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import '../../css/Dashboard.css';

import Settings from './Settings/Settings';
import Stats from './Stats';
import AddExpense from './AddExpense/AddExpense';
import Message from '../Message';

import {
  getExpenses,
  deleteExpense,
  addExpense
} from '../../store/actions/expenses';

import {
  getCategories,
  deleteCategory,
  addCategory
} from '../../store/actions/categories';

import {
  getLocations,
  deleteLocation,
  addLocation
} from '../../store/actions/locations';

import {
  getSources,
  deleteSource,
  addSource
} from '../../store/actions/sources';

import { loadUser } from '../../store/actions/auth';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      type: ''
    };
  }

  componentDidMount() {
    if (!this.props.auth.user) {
      this.props.loadUser();
    }

    this.props.getExpenses();
    this.props.getCategories();
    this.props.getLocations();
    this.props.getSources();
  }

  setMessage(message, type) {
    this.setState({
      message,
      type
    });
  }

  render() {
    const { message, type } = this.state;

    const pathname = this.props.location.pathname;
    const token = localStorage.getItem('token');

    if (token) {
      return (
        <section id="dashboard">
          <nav>
            <Link
              to="/dashboard/settings"
              className={pathname === '/dashboard/settings' ? 'active' : null}>
              Settings
            </Link>

            <Link
              to="/dashboard"
              className={pathname === '/dashboard' ? 'active' : null}>
              Add Expense
            </Link>

            <Link
              to="/dashboard/stats"
              className={pathname === '/dashboard/stats' ? 'active' : null}>
              Stats
            </Link>
          </nav>

          <Message
            message={message}
            type={type}
            clearMessage={() => this.setMessage('', '')}
          />

          <Route
            exact
            path="/dashboard"
            render={() => (
              <AddExpense
                {...this.props}
                setMessage={(message, type) => this.setMessage(message, type)}
              />
            )}
          />

          <Route
            path="/dashboard/settings"
            render={() => <Settings {...this.props} />}
          />
          
          <Route path="/dashboard/stats" component={Stats} />
        </section>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  expenses: state.expenses
});

const mapDispatchToProps = {
  getExpenses,
  deleteExpense,
  addExpense,

  getCategories,
  deleteCategory,
  addCategory,

  getLocations,
  deleteLocation,
  addLocation,

  getSources,
  deleteSource,
  addSource,

  loadUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
