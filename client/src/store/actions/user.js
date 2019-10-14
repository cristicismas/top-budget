import { USER_LOADING, USER_LOADED, USER_UPDATED, AUTH_SUCCESS, AUTH_FAIL, LOGOUT_SUCCESS } from './actionTypes';
import MESSAGE_TYPES from '../../constants/messageTypes';

import { addMessage } from './messages';
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
        type: USER_UPDATED,
        payload: data
      });

      dispatch(addMessage('Settings updated with success!', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('There was a problem updating the user settings.', MESSAGE_TYPES.ERROR));
    });
};

export const login = credentials => (dispatch, getState) => {
  const reqBody = JSON.stringify({ ...credentials });

  return apiCall('post', 'auth/login', reqBody, tokenConfig(getState))
    .then(res => {
      localStorage.setItem('token', res.token);

      dispatch({
        type: AUTH_SUCCESS,
        payload: res
      });

      dispatch(addMessage('Welcome back!', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('Password or username are wrong.', MESSAGE_TYPES.ERROR));
    });
};

export const register = credentials => (dispatch, getState) => {
  const reqBody = JSON.stringify({ ...credentials });

  return apiCall('post', 'auth/register', reqBody, tokenConfig(getState))
    .then(res => {
      localStorage.setItem('token', res.token);

      dispatch({
        type: AUTH_SUCCESS,
        payload: res
      });

      dispatch(addMessage('Welcome!', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('That email / username has already been taken, or your email is invalid.', MESSAGE_TYPES.ERROR));
    });
};

export const logout = () => (dispatch, getState) => {
  apiCall('post', 'auth/logout', null, tokenConfig(getState))
    .then(res => {
      localStorage.removeItem('token');

      dispatch(addMessage('You are now logged out.', MESSAGE_TYPES.SUCCESS));

      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(addMessage('Logout failed.', MESSAGE_TYPES.ERROR));
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
