import {
  USER_LOADING,
  USER_LOADED,
  AUTH_SUCCESS,
  AUTH_FAIL,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  LOGOUT_SUCCESS
} from './actionTypes';

import { apiCall } from '../../utils/api';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  apiCall('get', 'user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res[0]
      });
    })
    .catch(err => {
      localStorage.removeItem('token');

      dispatch({
        type: AUTH_FAIL,
        payload: err
      });
    });
};

export const updateUserSettings = newSettings => (dispatch, getState) => {
  const currentUser = getState().user.userdata.user;

  const data = {
    ...newSettings,
    user: currentUser
  };

  apiCall('patch', `user/${currentUser.id}/`, data, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err
      });
    });
};

export const login = credentials => (dispatch, getState) => {
  const reqBody = JSON.stringify({ ...credentials });

  apiCall('post', 'auth/login', reqBody, tokenConfig(getState))
    .then(res => {
      localStorage.setItem('token', res.token);

      dispatch({
        type: AUTH_SUCCESS,
        payload: res
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: 'Logged In.'
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err
      });
    });
};

export const register = credentials => (dispatch, getState) => {
  const reqBody = JSON.stringify({ ...credentials });

  apiCall('post', 'auth/register', reqBody, tokenConfig(getState))
    .then(res => {
      localStorage.setItem('token', res.token);

      dispatch({
        type: AUTH_SUCCESS,
        payload: res
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: 'Registration completed.'
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err
      });
    });
};

export const logout = () => (dispatch, getState) => {
  apiCall('post', 'auth/logout', null, tokenConfig(getState))
    .then(res => {
      localStorage.removeItem('token');

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: 'Logged Out.'
      });

      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: err
      });
    });
};

export const tokenConfig = getState => {
  const token = getState().user.token;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    axiosConfig.headers['Authorization'] = `Token ${token}`;
  }

  return axiosConfig;
};
