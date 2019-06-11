import { GET_EXPENSES, DELETE_EXPENSE, ADD_EXPENSE, ERROR_MESSAGE, SUCCESS_MESSAGE } from './actionTypes';
import { apiCall } from '../../utils/api';

import { tokenConfig } from './auth';

export const getExpenses = () => (dispatch, getState) => {
  apiCall('get', 'expenses', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_EXPENSES,
      payload: res
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const deleteExpense = id => (dispatch, getState) => {
  apiCall('delete', `expenses/${id}/`, tokenConfig(getState)).then(res => {
    dispatch({
      type: DELETE_EXPENSE,
      payload: id
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: 'Deleted.'
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const addExpense = expense => (dispatch, getState) => {
  apiCall('post', 'expenses/', expense, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_EXPENSE,
      payload: res
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: 'Added expense.'
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}