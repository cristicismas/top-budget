import { GET_CATEGORIES, DELETE_CATEGORY, ADD_CATEGORY, ERROR_MESSAGE, SUCCESS_MESSAGE } from './actionTypes';
import { apiCall } from '../../utils/api';

import { tokenConfig } from './user';

export const getCategories = () => (dispatch, getState) => {
  apiCall('get', 'categories', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_CATEGORIES,
      payload: res
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const deleteCategory = id => (dispatch, getState) => {
  apiCall('delete', `categories/${id}/`, tokenConfig(getState)).then(res => {
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
  apiCall('post', 'categories/', category, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_CATEGORY,
      payload: res
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