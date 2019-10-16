import { APP_LOADING, APP_LOADED } from '../actions/actionTypes';

const initialState = {
  isLoading: false
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
    default:
      return state;
  }
}
