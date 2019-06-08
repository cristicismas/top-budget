import { combineReducers } from 'redux';

import expenses from './expenses';
import auth from './auth';
import messages from './messages';
import categories from './categories';
import locations from './locations';
import sources from './sources';

export default combineReducers({
  expenses,
  auth,
  messages,
  categories,
  locations,
  sources
});