import axios from 'axios';
import { tokenConfig } from './auth';

import { GET_CATEGORIES, DELETE_CATEGORY, ADD_CATEGORY, ERROR_MESSAGE, SUCCESS_MESSAGE } from './actionTypes';

export const getCategories = () => (dispatch, getState) => {
  axios.get('http://localhost:8000/api/categories', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const deleteCategory = id => (dispatch, getState) => {
  axios.delete(`http://localhost:8000/api/categories/${id}`, tokenConfig(getState)).then(res => {
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: 'Deleted category.'
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const addCategory = category => (dispatch, getState) => {
  axios.post('http://localhost:8000/api/categories', category, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: 'Added category.'
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}