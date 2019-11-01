import React, { useEffect, lazy, Suspense } from 'react';
import AOS from 'aos';
import { useHistory } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'aos/dist/aos.css';

import Header from './Header';
import Home from './home/Home';

import Loading from './general/Loading';
import Message from './general/Message';
import NotFound from './NotFound';
import Setup from './setup/Setup';
import Overlay from './general/Overlay';

import { getExpenses } from '../store/actions/expenses';
import { getCategories } from '../store/actions/categories';
import { getLocations } from '../store/actions/locations';
import { getSources } from '../store/actions/sources';

import { clearMessages } from '../store/actions/messages';
import { loadUser } from '../store/actions/user';
import { allDataFetched } from '../store/actions/app';

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

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const AuthForm = lazy(() => import('./auth/AuthForm'));
const Settings = lazy(() => import('./settings/Settings'));

const LoadingOverlay = () => (
  <Overlay isTransparent={true} hideCloseOverlayButton={true}>
    <Loading />
  </Overlay>
);

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
  const { isAllDataFetched } = app;

  if (!isAllDataFetched) return <LoadingOverlay />;
  else
    return (
      <div className="App">
        <Header />

        <Suspense fallback={<LoadingOverlay />}>
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
        </Suspense>

        {messages.length > 0 && <Message {...messages[messages.length - 1]} clearMessages={dispatch(clearMessages)} />}
      </div>
    );
};

export default App;
