import React, { useEffect } from 'react';
import AOS from 'aos';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

import { clearMessages } from '../store/actions/messages';
import { loadUser } from '../store/actions/user';
import { allDataFetched } from '../store/actions/app';

import Setup from './setup/Setup';
import Overlay from './general/Overlay';

const handleDisableAnimations = disableAnimations => {
  const body = document.body;

  if (disableAnimations) {
    body.classList.add('disable-animations');
  } else {
    if (body.classList.contains('disable-animations')) {
      body.classList.remove('disable-animations');
    }
  }
};

const App = props => {
  const { history } = props;

  const dispatch = useDispatch();

  const { user, app, messages } = useSelector(state => ({
    user: state.user,
    app: state.app,
    messages: state.messages
  }));

  useEffect(() => {
    // Initialize Animate-On-Scroll library
    AOS.init();

    // Listen for route changes to reset position
    history.listen(location => {
      if (location.pathname === '/dashboard' || location.pathname === '/settings') {
        window.scrollTo(0, 0);
      }
    });

    // Fetch user and then the data
    dispatch(loadUser()).then(() => {
      if (user.isAuthenticated) {
        Promise.all([
          dispatch(getExpenses()),
          dispatch(getCategories()),
          dispatch(getLocations()),
          dispatch(getSources())
        ]).then(() => {
          dispatch(allDataFetched());
        });
      } else {
        if (user.isFetched) dispatch(allDataFetched());
      }
    });
  }, [dispatch, history, user.isAuthenticated, user.isFetched]);

  const { disableAnimations } = user.userdata;

  useEffect(() => {
    if (user.isAuthenticated) {
      handleDisableAnimations(disableAnimations);
    }
  }, [user.isAuthenticated, disableAnimations]);

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
            <AuthForm />
          </Route>

          <Route path="/setup">{isAuthenticated ? <Setup /> : <Redirect to="/login" />}</Route>

          <Route path="/dashboard">{isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}</Route>

          <Route path="/settings">{isAuthenticated ? <Settings /> : <Redirect to="/login" />}</Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        {messages.length > 0 && <Message {...messages[messages.length - 1]} clearMessages={dispatch(clearMessages)} />}
      </div>
    );
};

export default withRouter(App);
