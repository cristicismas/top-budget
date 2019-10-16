import { GET_EXPENSES, DELETE_EXPENSE, ADD_EXPENSE, EDIT_EXPENSE, APP_LOADING, APP_LOADED } from './actionTypes';
import MESSAGE_TYPES from '../../constants/messageTypes';
import { apiCall } from '../../utils/api';

import { addMessage } from './messages';
import { tokenConfig } from './user';

export const getExpenses = () => (dispatch, getState) => {
  dispatch({
    type: APP_LOADING
  });

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

      dispatch({
        type: APP_LOADED
      });
    })
    .catch(err => {
      dispatch({
        type: APP_LOADED
      });

      dispatch(addMessage('There was an error getting the expenses.', MESSAGE_TYPES.ERROR));
    });
};

export const deleteExpense = id => (dispatch, getState) => {
  apiCall('delete', `expenses/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_EXPENSE,
        payload: id
      });

      dispatch(addMessage('Expense deleted with success.', MESSAGE_TYPES.SUCCESS, true));
    })
    .catch(err => {
      dispatch(addMessage('There was an error deleting the expense.', MESSAGE_TYPES.ERROR, true));
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

      dispatch(addMessage('Expense added with success.', MESSAGE_TYPES.SUCCESS, true));
    })
    .catch(err => {
      dispatch(addMessage('There was an error adding the expense.', MESSAGE_TYPES.ERROR, true));
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

      dispatch(addMessage('Expense edited with success.', MESSAGE_TYPES.SUCCESS, true));
    })
    .catch(err => {
      dispatch(addMessage('There was an error editing the expense.', MESSAGE_TYPES.ERROR, true));
    });
};
