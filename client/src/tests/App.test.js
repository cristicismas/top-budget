import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store.js';

import App from '../components/App';

it('renders wrapped App without crashing', () => {
  const body = document.querySelector('body');
  
  const appRoot = document.createElement('div');
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');

  body.appendChild(appRoot);
  body.appendChild(modalRoot);
  
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    appRoot
  );

  ReactDOM.unmountComponentAtNode(appRoot);
  ReactDOM.unmountComponentAtNode(modalRoot);
});
