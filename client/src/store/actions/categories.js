import { GET_CATEGORIES, DELETE_CATEGORY, ADD_CATEGORY } from './actionTypes';
import MESSAGE_TYPES from '../../constants/messageTypes';
import { apiCall } from '../../utils/api';

import { beginLoading, finishLoading } from './app';
import { addMessage } from './messages';
import { tokenConfig } from './user';

export const getCategories = () => (dispatch, getState) => {
  dispatch(beginLoading());

  apiCall('get', 'categories', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res
      });

      dispatch(finishLoading());
    })
    .catch(err => {
      dispatch(finishLoading());

      dispatch(addMessage('There was a problem getting the categories.', MESSAGE_TYPES.ERROR));
    });
};

export const deleteCategory = id => (dispatch, getState) => {
  apiCall('delete', `categories/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      });

      dispatch(addMessage('Category deleted with success.', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('There was a problem deleting the category.', MESSAGE_TYPES.ERROR));
    });
};

export const addCategory = category => (dispatch, getState) => {
  apiCall('post', 'categories/', category, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_CATEGORY,
        payload: res
      });

      dispatch(addMessage('Category added with success.', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('There was a problem adding the category.', MESSAGE_TYPES.ERROR));
    });
};
