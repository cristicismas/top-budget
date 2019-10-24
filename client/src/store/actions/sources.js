import { GET_SOURCES, DELETE_SOURCE, EDIT_SOURCE, ADD_SOURCE } from './actionTypes';
import MESSAGE_TYPES from '../../constants/messageTypes';
import { apiCall } from '../../utils/api';

import { beginLoading, finishLoading } from './app';
import { addMessage } from './messages';
import { tokenConfig } from './user';

export const getSources = () => (dispatch, getState) => {
  dispatch(beginLoading());

  return apiCall('get', 'sources', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SOURCES,
        payload: res
      });

      dispatch(finishLoading());
    })
    .catch(err => {
      dispatch(finishLoading());

      dispatch(addMessage('There was a problem getting the source.', MESSAGE_TYPES.ERROR));
    });
};

export const deleteSource = id => (dispatch, getState) => {
  apiCall('delete', `sources/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_SOURCE,
        payload: id
      });

      dispatch(addMessage('Source deleted with success.', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('There was a problem deleting the source.', MESSAGE_TYPES.ERROR));
    });
};

export const editSource = source => (dispatch, getState) => {
  apiCall('patch', `sources/${source.id}/`, source, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EDIT_SOURCE,
        payload: res
      });

      dispatch(addMessage('Source edited with success.', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('There was a problem editing the source.', MESSAGE_TYPES.ERROR));
    });
};

export const addSource = source => (dispatch, getState) => {
  apiCall('post', 'sources/', source, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_SOURCE,
        payload: res
      });

      dispatch(addMessage('Source added with success.', MESSAGE_TYPES.SUCCESS));
    })
    .catch(err => {
      dispatch(addMessage('There was a problem adding the source.', MESSAGE_TYPES.ERROR));
    });
};
