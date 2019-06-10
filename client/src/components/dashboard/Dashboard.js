import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import '../../css/Dashboard.css';

import Settings from './Settings';
import Stats from './Stats';
import AddExpense from './AddExpense';

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

import {
  loadUser
} from '../../store/actions/auth';


class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.user) {
      this.props.loadUser();
    }
  }

  render() {
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

          <Route exact path="/dashboard" render={() => <AddExpense {...this.props} />} />
          <Route path="/dashboard/settings" component={Settings} />
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
  expenses: state.expenses,
  categories: state.categories,
  locations: state.locations,
  sources: state.sources
});

export default connect(
  mapStateToProps,
  {
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
  }
)(Dashboard);
