import axios from 'axios';
import { tokenConfig } from './auth';

import { GET_EXPENSES, DELETE_EXPENSE, ADD_EXPENSE, ERROR_MESSAGE, SUCCESS_MESSAGE } from './actionTypes';

export const getExpenses = () => (dispatch, getState) => {
  axios.get('http://localhost:8000/api/expenses', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_EXPENSES,
      payload: res.data
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const deleteExpense = id => (dispatch, getState) => {
  axios.delete(`http://localhost:8000/api/expenses/${id}`, tokenConfig(getState)).then(res => {
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
  axios.post('http://localhost:8000/api/expenses', expense, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_EXPENSE,
      payload: res.data
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