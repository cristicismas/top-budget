import { APP_LOADING, APP_LOADED, APP_DATA_FETCHED } from './actionTypes';

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

export const allDataFetched = () => dispatch => {
  dispatch({
    type: APP_DATA_FETCHED
  });
};
