import { ADD_MESSAGE, DELETE_MESSAGES } from './actionTypes';

export const addMessage = (text, type, shouldFadeOut = true) => (dispatch, getState) => {
  dispatch({
    type: ADD_MESSAGE,
    payload: {
      text,
      type,
      shouldFadeOut
    }
  });

  if (shouldFadeOut) {
    const messagesLength = getState().messages.length;

    const messagesTimeout = setTimeout(() => {
      const currentMessagesLength = getState().messages.length;

      // If more messages have been added while in timeout, reset the timeout.
      if (messagesLength !== currentMessagesLength) {
        clearTimeout(messagesTimeout);
      } else {
        dispatch(clearMessages());
      }
    }, 3000);
  }
};

export const clearMessages = () => dispatch => {
  dispatch({
    type: DELETE_MESSAGES
  });
};
