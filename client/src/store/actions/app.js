import { APP_LOADING, APP_LOADED } from './actionTypes';

export const beginLoading = () => dispatch => {
  dispatch({
    type: APP_LOADING
  });
};
export const finishLoading = () => dispatch => {
  dispatch({
    type: APP_LOADED
  });
};
