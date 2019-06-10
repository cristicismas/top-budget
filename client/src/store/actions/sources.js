import { GET_SOURCES, DELETE_SOURCE, ADD_SOURCE, ERROR_MESSAGE, SUCCESS_MESSAGE } from './actionTypes';
import { apiCall } from '../../utils/api';

import { tokenConfig } from './auth';

export const getSources = () => (dispatch, getState) => {
  apiCall('get', 'sources', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_SOURCES,
      payload: res
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const deleteSource = id => (dispatch, getState) => {
  apiCall('delete', `sources/${id}/`, tokenConfig(getState)).then(res => {
    dispatch({
      type: DELETE_SOURCE,
      payload: id
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: 'Deleted source.'
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const addSource = source => (dispatch, getState) => {
  apiCall('post', 'sources/', source, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_SOURCE,
      payload: res
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: 'Added source.'
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}