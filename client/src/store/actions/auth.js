import axios from 'axios';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, AUTH_SUCCESS, LOGOUT_SUCCESS, AUTH_FAIL } from './actionTypes';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios.get('http://localhost:8000/api/auth/user', tokenConfig(getState)).then(res => {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  }).catch(err => {
    dispatch({
      type: AUTH_FAIL,
      error: err
    });
    console.error(err);
  });
}

export const login = credentials => dispatch => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const reqBody = JSON.stringify({ ...credentials });

  axios.post('http://localhost:8000/api/auth/login', reqBody, axiosConfig).then(res => {
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    });
  }).catch(err => {
    dispatch({
      type: AUTH_FAIL,
      error: err
    });
    console.error(err);
  });
}

export const register = credentials => dispatch => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const reqBody = JSON.stringify({ ...credentials });

  axios.post('http://localhost:8000/api/auth/register', reqBody, axiosConfig).then(res => {
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    });
  }).catch(err => {
    dispatch({
      type: AUTH_ERROR,
      error: err
    });
    console.error(err);
  });
}

export const logout = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    axiosConfig.headers['Authorization'] = `Token ${token}`;
  }

  axios.post('http://localhost:8000/api/auth/logout/', null, axiosConfig).then(res => {
    dispatch({ type: LOGOUT_SUCCESS });
  }).catch(err => {
    dispatch({
      type: AUTH_ERROR,
      error: err
    });
    console.error(err);
  });
}

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    axiosConfig.headers['Authorization'] = `Token ${token}`;
  }

  return axiosConfig;
}