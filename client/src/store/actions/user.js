import { USER_LOADED, USER_UPDATED, AUTH_SUCCESS, AUTH_FAIL, LOGOUT_SUCCESS } from './actionTypes';
import AUTH_TYPES from '../../constants/auth';
import MESSAGE_TYPES from '../../constants/messageTypes';

import { beginLoading, finishLoading, allDataFetched } from './app';
import { addMessage } from './messages';
import { apiCall } from '../../utils/api';

export const loadUser = () => (dispatch, getState) => {
  return apiCall('get', 'user', tokenConfig(getState))
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
  const currentCredentials = getState().user.userdata.credentials;

  const data = {
    ...newSettings,
    credentials: currentCredentials
  };

  apiCall('patch', `user/${currentCredentials.id}/`, data, tokenConfig(getState))
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

export const authenticate = (credentials, type) => (dispatch, getState) => {
  dispatch(beginLoading());

  const reqBody = JSON.stringify({ ...credentials });

  return apiCall('post', `auth/${type}`, reqBody, tokenConfig(getState))
    .then(res => {
      localStorage.setItem('token', res.token);

      dispatch({
        type: AUTH_SUCCESS,
        payload: res
      });

      dispatch(finishLoading());
      dispatch(allDataFetched());

      if (type === AUTH_TYPES.LOG_IN) {
        const { username } = res.userdata.credentials;

        dispatch(addMessage(`Welcome back, ${username}!`, MESSAGE_TYPES.SUCCESS));
      }
    })
    .catch(err => {
      dispatch(finishLoading());
      dispatch(allDataFetched());

      if (type === AUTH_TYPES.SIGN_UP) {
        const errorMessage = err.username
          ? err.username
          : 'An unexpected error happened. Please try again later or contact an administrator.';
          
        dispatch(
          addMessage(errorMessage, MESSAGE_TYPES.ERROR)
        );
      } else {
        const errorMessage = err.non_field_errors
          ? err.non_field_errors
          : 'An unexpected error happened. Please try again later or contact an administrator.';

        dispatch(addMessage(errorMessage, MESSAGE_TYPES.ERROR));
      }
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

      dispatch(addMessage('You are now logged out.', MESSAGE_TYPES.SUCCESS));
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
