import { GET_EXPENSES, DELETE_EXPENSE, ADD_EXPENSE, EDIT_EXPENSE, ERROR_MESSAGE, SUCCESS_MESSAGE } from './actionTypes';
import { apiCall } from '../../utils/api';

import { tokenConfig } from './user';

export const getExpenses = () => (dispatch, getState) => {
  apiCall('get', 'expenses', tokenConfig(getState))
    .then(res => {
      const expenses = res.map(expense => {
        return {
          ...expense,
          value: Number(expense.value)
        };
      });

      dispatch({
        type: GET_EXPENSES,
        payload: expenses
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err
      });
    });
};

export const deleteExpense = id => (dispatch, getState) => {
  apiCall('delete', `expenses/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_EXPENSE,
        payload: id
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: 'Expense deleted.'
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err
      });
    });
};

export const addExpense = expense => (dispatch, getState) => {
  apiCall('post', 'expenses/', expense, tokenConfig(getState))
    .then(res => {
      const newExpense = { ...res, value: Number(res.value) };

      dispatch({
        type: ADD_EXPENSE,
        payload: newExpense
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: 'Added expense.'
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err
      });
    });
};

export const editExpense = expense => (dispatch, getState) => {
  apiCall('patch', `expenses/${expense.id}/`, expense, tokenConfig(getState))
    .then(res => {
      const editedExpense = { ...res, value: Number(res.value) };

      dispatch({
        type: EDIT_EXPENSE,
        payload: editedExpense
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: 'Edited expense.'
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err
      });
    });
};
