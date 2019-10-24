import { GET_SOURCES, DELETE_SOURCE, EDIT_SOURCE, ADD_SOURCE } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SOURCES:
      return action.payload;
    case DELETE_SOURCE:
      return state.filter(source => source.id !== action.payload);
    case EDIT_SOURCE:
      // Clone the state
      const updatedState = [...state];

      for (let i = 0; i < updatedState.length; i++) {
        // If the current element matches the edited element, replace it
        if (updatedState[i].id === action.payload.id) {
          updatedState[i] = action.payload;
        }
      }

      return updatedState;
    case ADD_SOURCE:
      return [...state, action.payload];
    default:
      return state;
  }
}
