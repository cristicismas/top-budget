import axios from 'axios';
import { tokenConfig } from './auth';

import { GET_EXPENSES, DELETE_EXPENSE, ADD_EXPENSE } from './actionTypes';

export const getExpenses = () => (dispatch, getState) => {
  axios.get('http://localhost:8000/api/expenses', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_EXPENSES,
      payload: res.data
    });
  }).catch(err => {
    console.error(err);
  });
}

export const deleteExpense = id => (dispatch, getState) => {
  axios.delete(`http://localhost:8000/api/expenses/${id}`, tokenConfig(getState)).then(res => {
    dispatch({
      type: DELETE_EXPENSE,
      payload: id
    });
  }).catch(err => {
    console.error(err);
  });
}

export const getExpenses = expense => (dispatch, getState) => {
  axios.post('http://localhost:8000/api/expenses', expense, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_EXPENSE,
      payload: res.data
    });
  }).catch(err => {
    console.error(err);
  });
}