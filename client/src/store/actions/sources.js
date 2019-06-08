import axios from 'axios';
import { tokenConfig } from './auth';

import { GET_SOURCES, DELETE_SOURCE, ADD_SOURCE, ERROR_MESSAGE } from './actionTypes';

export const getSources = () => (dispatch, getState) => {
  axios.get('http://localhost:8000/api/sources', tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_SOURCES,
      payload: res.data
    });
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: err
    });
  });
}

export const deleteSource = id => (dispatch, getState) => {
  axios.delete(`http://localhost:8000/api/sources/${id}`, tokenConfig(getState)).then(res => {
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
  axios.post('http://localhost:8000/api/sources', source, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_SOURCE,
      payload: res.data
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