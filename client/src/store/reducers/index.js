import { combineReducers } from 'redux';

import expenses from './expenses';
import auth from './auth';

export default combineReducers({
  expenses,
  auth
});