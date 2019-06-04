import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/auth';

import Header from './Header';
import Home from './Home';
import AuthForm from './auth/AuthForm';

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header {...this.props} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" render={() => <AuthForm type="signup" />} />
            <Route exact path="/login" render={() => <AuthForm type="login" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, { loadUser })(App);
