import { USER_LOADED, LOGOUT_SUCCESS, AUTH_SUCCESS, AUTH_FAIL, USER_UPDATED } from '../actions/actionTypes';
import FIELDS from '../../constants/fields';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: null,
  isFetched: false,
  userdata: {
    currency: 'USD',
    budget: 0,
    showCategories: true,
    showLocations: true,
    showSources: true,
    disableAnimations: false,
    primaryField: FIELDS.CATEGORIES,
    credentials: {
      email: '',
      username: ''
    }
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isFetched: true,
        userdata: action.payload
      };
    case USER_UPDATED:
      return {
        ...state,
        userdata: action.payload
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      };
    case AUTH_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        userdata: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
