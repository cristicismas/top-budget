import { APP_LOADING, APP_LOADED, APP_DATA_FETCHED } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isDataFetched: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APP_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case APP_LOADED:
      return {
        ...state,
        isLoading: false
      };
    case APP_DATA_FETCHED:
      return {
        ...state,
        isDataFetched: true
      };
    default:
      return state;
  }
}
