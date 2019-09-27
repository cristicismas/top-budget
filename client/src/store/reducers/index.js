import { combineReducers } from 'redux';

import expenses from './expenses';
import categories from './categories';
import locations from './locations';
import sources from './sources';
import user from './user';
import messages from './messages';

export default combineReducers({
  expenses,
  categories,
  locations,
  sources,
  user,
  messages
});
