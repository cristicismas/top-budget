import React, { Component } from 'react';
import AOS from 'aos';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'aos/dist/aos.css';

import Loading from './Loading';
import Header from './Header';
import Home from './home/Home';
import AuthForm from './auth/AuthForm';
import Dashboard from './dashboard/Dashboard';

import { getExpenses } from '../store/actions/expenses';
import { getCategories } from '../store/actions/categories';
import { getLocations } from '../store/actions/locations';
import { getSources } from '../store/actions/sources';

import { loadUser } from '../store/actions/user';

class App extends Component {
  componentDidMount() {
    AOS.init();

    if (!this.props.user.userdata) {
      this.props.loadUser();
    }
  }

  render() {
    const { loading, isAuthenticated } = this.props.user;

    if (loading) {
      return <Loading />;
    }

    return (
      <Router>
        <div className="App">
          <Header />

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/signup">
            <AuthForm type="signup" />
          </Route>

          <Route exact path="/login">
            <AuthForm type="login" />
          </Route>

          <Route path="/dashboard">{isAuthenticated ? <Dashboard {...this.props} /> : <Home />}</Route>
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
