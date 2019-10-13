import React, { Component } from 'react';
import AOS from 'aos';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'aos/dist/aos.css';

import Loading from './general/Loading';
import Header from './Header';
import NotFound from './NotFound';
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

    this.props.loadUser();
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

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/signup">
              {isAuthenticated ? <Redirect to="/dashboard" /> : <AuthForm type="signup" />}
            </Route>

            <Route exact path="/login">
              {isAuthenticated ? <Redirect to="/dashboard" /> : <AuthForm type="login" />}
            </Route>

            <Route path="/dashboard">
              {isAuthenticated === false ? <Redirect to="/" /> : <Dashboard {...this.props} />}
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
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
