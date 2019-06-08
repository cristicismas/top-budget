import axios from 'axios';
import { tokenConfig } from './auth';

import { GET_LOCATIONS, DELETE_LOCATION, ADD_LOCATION, ERROR_MESSAGE } from './actionTypes';

export const getLocations = () => (dispatch, getState) => {
  axios.get('http://localhost:8000/api/locations', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_LOCATIONS,
      payload: res.data
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const deleteLocation = id => (dispatch, getState) => {
  axios.delete(`http://localhost:8000/api/locations/${id}`, tokenConfig(getState)).then(res => {
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
  axios.post('http://localhost:8000/api/locations', location, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_LOCATION,
      payload: res.data
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