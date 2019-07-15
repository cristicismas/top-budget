import { combineReducers } from 'redux';

import expenses from './expenses';
import user from './user';
import messages from './messages';

export default combineReducers({
  expenses,
  user,
  messages
});