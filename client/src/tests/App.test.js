import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store.js';

import App from '../components/App';

let appRoot = null;
let modalRoot = null;

beforeEach(() => {
  appRoot = document.createElement('div');
  modalRoot = document.createElement('div');

  modalRoot.setAttribute('id', 'modal-root');

  document.body.appendChild(appRoot);
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  unmountComponentAtNode(appRoot);
  appRoot.remove();
  appRoot = null;

  unmountComponentAtNode(modalRoot);
  modalRoot.remove();
  modalRoot = null;
});

it('renders wrapped App without crashing', () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    appRoot
  );
});
