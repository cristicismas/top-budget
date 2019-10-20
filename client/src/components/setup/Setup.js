import React, { useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import './Setup.css';

import NavigationButtons from './NavigationButtons';
import ChooseFields from './AddFields';
import AddExpense from './AddExpense';

const setupRoutes = [
  '/setup',
  '/setup/add-fields/categories',
  '/setup/add-fields/locations',
  '/setup/add-fields/sources',
  '/setup/add-expenses'
];

const getRouteIndex = (routes, pathname) => {
  let routeIndex = null;

  routes.forEach((route, index) => {
    if (pathname.includes(route)) {
      routeIndex = index;
    }
  });

  return routeIndex;
};

const useRouteIndex = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  // Get initial route index
  let initialRouteIndex = getRouteIndex(setupRoutes, pathname);
  const [currentRouteIndex, setRouteIndex] = useState(initialRouteIndex);

  // Listen for history changes and update route index.
  history.listen(location => {
    const newRouteIndex = getRouteIndex(setupRoutes, location.pathname);

    if (newRouteIndex !== null && newRouteIndex !== currentRouteIndex) {
      setRouteIndex(newRouteIndex);
    }
  });

  const prevRoute = () => history.goBack();
  const nextRoute = () => history.push(setupRoutes[currentRouteIndex + 1]);

  return [currentRouteIndex, prevRoute, nextRoute];
};

const Setup = () => {
  const [currentRouteIndex, prevRoute, nextRoute] = useRouteIndex();

  const showBackBtn = currentRouteIndex > 0;
  const showNextBtn = currentRouteIndex < setupRoutes.length - 1;

  return (
    <main id="setup">
      <Route exact path="/setup">
        <div className="titles">
          <h1 className="title">Welcome!</h1>

          <h2 className="sub-title">
            Welcome to <span className="accent">TopBudget</span>.<br />
            We will help you get started with this short setup.
          </h2>
        </div>
      </Route>

      <Route path="/setup/add-fields">
        <ChooseFields />
      </Route>

      <Route exact path="/setup/add-expenses">
        <AddExpense />
      </Route>

      <NavigationButtons onBack={prevRoute} onNext={nextRoute} showBack={showBackBtn} showNext={showNextBtn} />
    </main>
  );
};

export default Setup;
