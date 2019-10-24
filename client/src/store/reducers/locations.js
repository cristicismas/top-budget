import { GET_LOCATIONS, DELETE_LOCATION, EDIT_LOCATION, ADD_LOCATION } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.payload;
    case DELETE_LOCATION:
      return state.filter(location => location.id !== action.payload);
    case EDIT_LOCATION:
      // Clone the state
      const updatedState = [...state];

      for (let i = 0; i < updatedState.length; i++) {
        // If the current element matches the edited element, replace it
        if (updatedState[i].id === action.payload.id) {
          updatedState[i] = action.payload;
        }
      }

      return updatedState;
    case ADD_LOCATION:
      return [...state, action.payload];
    default:
      return state;
  }
}
