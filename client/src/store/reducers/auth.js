import { USER_LOADING, USER_LOADED, LOGOUT_SUCCESS, AUTH_SUCCESS, AUTH_FAIL } from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: null,
  isLoading: false,
  user: null
}

export default function(state=initialState, action) {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case AUTH_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
}