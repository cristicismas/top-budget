import { ADD_MESSAGE, DELETE_MESSAGES } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];
    case DELETE_MESSAGES:
      return [];
    default:
      return state;
  }
}
