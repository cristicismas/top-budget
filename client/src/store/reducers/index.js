import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../actions/actionTypes';

import expenses from './expenses';
import categories from './categories';
import locations from './locations';
import sources from './sources';
import user from './user';
import messages from './messages';

const allReducers = combineReducers({
  expenses,
  categories,
  locations,
  sources,
  user,
  messages
});

export default (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }

  return allReducers(state, action);
}