import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token
  };
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
}

export const authSignup = credentials => {
  return dispatch => {
    dispatch(authStart());

    axios.post('http://localhost:8000/api/auth/signup', {
      ...credentials
    }).then(res => {
      const token = res.data.key;
      localStorage.setItem('token', token);

      dispatch(authSuccess(token));
    }).catch(err => {
      dispatch(authFail(err));
    });
  };
}

export const authLogin = credentials => {
  return dispatch => {
    dispatch(authStart());

    axios.post('http://localhost:8000/api/auth/login', {
      ...credentials
    }).then(res => {
      const token = res.data.key;
      localStorage.setItem('token', token);

      dispatch(authSuccess(token));
    }).catch(err => {
      dispatch(authFail(err));
    });
  };
}

export const logout = () => {
  localStorage.removeItem('user');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  }
}