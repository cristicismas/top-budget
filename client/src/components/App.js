import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import '../css/Header.css';

import Loading from './Loading';
import Header from './Header';
import Home from './Home';
import AuthForm from './auth/AuthForm';

class App extends Component {
  componentDidMount() {
    this.props.tryAutoAuthentication();
  }

  render() {
    return (
      <Router>
        <div className="App">
          {
            this.props.loading ? (
              <Loading />
            ) : null
          }

          <Header {...this.props} />

          <Route exact path="/" component={Home} />
          <Route path="/signup" render={() => <AuthForm type="signup" />} />
          <Route path="/login" render={() => <AuthForm type="login" />} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    loading: state.loading,
    error: state.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoAuthentication: () => {
      dispatch(actions.authCheckState())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
