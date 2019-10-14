import React, { Component } from 'react';
import AOS from 'aos';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'aos/dist/aos.css';

import Loading from './general/Loading';
import Message from './general/Message';
import Header from './Header';
import NotFound from './NotFound';
import Home from './home/Home';
import AuthForm from './auth/AuthForm';
import Dashboard from './dashboard/Dashboard';

import { getExpenses } from '../store/actions/expenses';
import { getCategories } from '../store/actions/categories';
import { getLocations } from '../store/actions/locations';
import { getSources } from '../store/actions/sources';

import { addMessage, clearMessages } from '../store/actions/messages';

import { loadUser } from '../store/actions/user';

class App extends Component {
  componentDidMount() {
    AOS.init();

    this.props.loadUser();
  }

  render() {
    const { messages, clearMessages, user } = this.props;
    const { loading, isAuthenticated } = user;

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

          {messages.map((message, index) => (
            <Message
              key={`message-${index}`}
              message={message.text}
              type={message.type}
              shouldFadeOut={message.shouldFadeOut}
              clearMessages={clearMessages}
            />
          ))}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages
});

const mapDispatchToProps = {
  getExpenses,
  getCategories,
  getLocations,
  getSources,
  addMessage,
  clearMessages,
  loadUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
