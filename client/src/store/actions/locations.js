import { GET_LOCATIONS, DELETE_LOCATION, ADD_LOCATION, ERROR_MESSAGE, SUCCESS_MESSAGE } from './actionTypes';
import { apiCall } from '../../utils/api';

import { tokenConfig } from './user';

export const getLocations = () => (dispatch, getState) => {
  apiCall('get', 'locations', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_LOCATIONS,
      payload: res
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const deleteLocation = id => (dispatch, getState) => {
  apiCall('delete', `locations/${id}/`, tokenConfig(getState)).then(res => {
    dispatch({
      type: DELETE_LOCATION,
      payload: id
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: 'Deleted location.'
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const addLocation = location => (dispatch, getState) => {
  apiCall('post', 'locations/', location, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_LOCATION,
      payload: res
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: 'Added location.'
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}