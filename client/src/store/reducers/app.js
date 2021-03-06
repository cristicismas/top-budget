import { APP_LOADING, APP_LOADED, APP_DATA_FETCHED } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isAllDataFetched: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APP_LOADING:
      return {
        ...state,
        isLoading: true,
        isAllDataFetched: false
      };
    case APP_LOADED:
      return {
        ...state,
        isLoading: false
      };
    case APP_DATA_FETCHED:
      return {
        ...state,
        isAllDataFetched: true
      };
    default:
      return state;
  }
}
