import React, { Component } from 'react';
import AOS from 'aos';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'aos/dist/aos.css';

import Loading from './general/Loading';
import Message from './general/Message';
import Header from './Header';
import NotFound from './NotFound';
import Home from './home/Home';
import AuthForm from './auth/AuthForm';
import Dashboard from './dashboard/Dashboard';
import Settings from './settings/Settings';

import { getExpenses } from '../store/actions/expenses';
import { getCategories } from '../store/actions/categories';
import { getLocations } from '../store/actions/locations';
import { getSources } from '../store/actions/sources';

import { addMessage, clearMessages } from '../store/actions/messages';
import { loadUser } from '../store/actions/user';
import { allDataFetched } from '../store/actions/app';

import Setup from './setup/Setup';
import Overlay from './general/Overlay';

class App extends Component {
  componentDidMount() {
    // Initialize Animate-On-Scroll library
    AOS.init();

    // Listen for route changes to reset position
    this.props.history.listen(location => {
      if (location.pathname === '/dashboard' || location.pathname === '/settings') {
        window.scrollTo(0, 0);
      }
    });

    // Fetch user and then the data
    this.props.loadUser().then(() => {
      const { user, getExpenses, getCategories, getLocations, getSources, allDataFetched } = this.props;

      if (user.isAuthenticated) {
        Promise.all([getExpenses(), getCategories(), getLocations(), getSources()]).then(() => {
          allDataFetched();
        });
      } else {
        allDataFetched();
      }
    });
  }

  render() {
    const { app, messages, clearMessages, user } = this.props;

    const { isAuthenticated } = user;
    const { isLoading, isDataFetched } = app;

    if (isLoading || !isDataFetched)
      return (
        <Overlay isTransparent={true} hideCloseOverlayButton={true}>
          <Loading />
        </Overlay>
      );
    else
      return (
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path={['/signup', '/login']}>
              <AuthForm
                getExpenses={() => this.props.getExpenses()}
                getCategories={() => this.props.getCategories()}
                getLocations={() => this.props.getLocations()}
                getSources={() => this.props.getSources()}
              />
            </Route>

            <Route path="/setup">
              <Setup />
            </Route>

            <Route path="/dashboard">{isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}</Route>

            <Route path="/settings">{isAuthenticated ? <Settings /> : <Redirect to="/login" />}</Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>

          {messages.map((message, index) => (
            <Message key={`message-${index}`} {...message} clearMessages={clearMessages} />
          ))}
        </div>
      );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  messages: state.messages
});

const mapDispatchToProps = {
  getExpenses,
  getCategories,
  getLocations,
  getSources,
  addMessage,
  clearMessages,
  loadUser,
  allDataFetched
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
