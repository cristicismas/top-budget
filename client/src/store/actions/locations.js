import { GET_LOCATIONS, DELETE_LOCATION, ADD_LOCATION, APP_LOADING, APP_LOADED } from './actionTypes';
import MESSAGE_TYPES from '../../constants/messageTypes';
import { apiCall } from '../../utils/api';

import { addMessage } from './messages';
import { tokenConfig } from './user';

export const getLocations = () => (dispatch, getState) => {
  dispatch({
    type: APP_LOADING
  });

  apiCall('get', 'locations', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LOCATIONS,
        payload: res
      });

      dispatch({
        type: APP_LOADED
      });
    })
    .catch(err => {
      dispatch({
        type: APP_LOADED
      });

      dispatch(addMessage('There was a problem getting the locations.', MESSAGE_TYPES.ERROR));
    });
};

export const deleteLocation = id => (dispatch, getState) => {
  apiCall('delete', `locations/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_LOCATION,
        payload: id
      });

      dispatch(addMessage('Location deleted with success.', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('There was a problem deleting the location.', MESSAGE_TYPES.ERROR));
    });
};

export const addLocation = location => (dispatch, getState) => {
  apiCall('post', 'locations/', location, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_LOCATION,
        payload: res
      });

      dispatch(addMessage('Location added with success.', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('There was a problem adding the location.', MESSAGE_TYPES.ERROR));
    });
};
