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
      if (this.props.user.isAuthenticated) {
        this.props.getExpenses();
        this.props.getCategories();
        this.props.getLocations();
        this.props.getSources();
      }
    });
  }

  render() {
    const { app, messages, clearMessages, user } = this.props;

    const { isAuthenticated } = user;
    const { isLoading } = app;

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

          <Route path="/dashboard">{isAuthenticated === false ? <Redirect to="/signup" /> : <Dashboard />}</Route>

          <Route path="/settings">{isAuthenticated === false ? <Redirect to="/signup" /> : <Settings />}</Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        {messages.map((message, index) => (
          <Message key={`message-${index}`} {...message} clearMessages={clearMessages} />
        ))}

        {isLoading && (
          <Overlay isTransparent={true} hideCloseOverlayButton={true}>
            <Loading />
          </Overlay>
        )}
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
  loadUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
