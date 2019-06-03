import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../store/store.js';
import '../css/Header.css';

import Loading from './Loading';
import Header from './Header';
import Home from './Home';
import AuthForm from './auth/AuthForm';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
