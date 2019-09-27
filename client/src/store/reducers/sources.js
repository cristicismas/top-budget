import { GET_SOURCES, DELETE_SOURCE, ADD_SOURCE } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SOURCES:
      return action.payload;
    case DELETE_SOURCE:
      return state.filter(source => source.id !== action.payload);
    case ADD_SOURCE:
      return [...state, action.payload];
    default:
      return state;
  }
}
