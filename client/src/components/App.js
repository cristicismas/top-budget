import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from './Loading';
import Header from './Header';
import Home from './Home';
import AuthForm from './auth/AuthForm';
import Dashboard from './dashboard/Dashboard';

import { getExpenses } from '../store/actions/expenses';
import { getCategories } from '../store/actions/categories';
import { getLocations } from '../store/actions/locations';
import { getSources } from '../store/actions/sources';

import { loadUser } from '../store/actions/user';

class App extends Component {
  componentDidMount() {
    if (!this.props.user.userdata) {
      this.props.loadUser();
    }
  }

  render() {
    const loading = this.props.user.isLoading;

    if (loading) {
      return <Loading />;
    }

    return (
      <Router>
        <div className="App">
          <Header />

          <Route exact path="/" component={Home} />
          <Route exact path="/signup" render={props => <AuthForm type="signup" {...props} />} />
          <Route exact path="/login" render={props => <AuthForm type="login" {...props} />} />
          <Route path="/dashboard" render={props => <Dashboard {...props} {...this.props} />} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  getExpenses,
  getCategories,
  getLocations,
  getSources,
  loadUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
