import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/user';

import Loading from './Loading';
import Header from './Header';
import Home from './Home';
import AuthForm from './auth/AuthForm';
import Dashboard from './dashboard/Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const loading = this.props.user.isLoading;

    if (loading) {
      return (
        <Loading />
      )
    }

    return (
      <Router>
        <div className="App">
          <Header {...this.props} />

          <Route exact path="/" component={Home} />
          <Route exact path="/signup" render={props => <AuthForm type="signup" {...props} />} />
          <Route exact path="/login" render={props => <AuthForm type="login" {...props} />} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { loadUser })(App);
