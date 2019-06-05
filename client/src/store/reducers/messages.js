import { ERROR_MESSAGE, SUCCESS_MESSAGE, DELETE_MESSAGES } from '../actions/actionTypes';

const initialState = {
  errors: [],
  successes: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case ERROR_MESSAGE:
      return {
        ...state,
        errors: [...state.errors, action.payload]
      };
    case SUCCESS_MESSAGE:
      return {
        ...state,
        successes: [...state.successes, action.payload]
      };
    case DELETE_MESSAGES:
      return {
        ...state,
        errors: [],
        successes: []
      };
    default:
      return state;
  }
}