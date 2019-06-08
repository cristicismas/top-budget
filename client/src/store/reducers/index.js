import { combineReducers } from 'redux';

import expenses from './expenses';
import auth from './auth';
import messages from './messages';

export default combineReducers({
  expenses,
  auth,
  messages
});