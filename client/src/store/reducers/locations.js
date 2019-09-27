import { GET_LOCATIONS, DELETE_LOCATION, ADD_LOCATION } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.payload;
    case DELETE_LOCATION:
      return state.filter(location => location.id !== action.payload);
    case ADD_LOCATION:
      return [...state, action.payload];
    default:
      return state;
  }
}
