import { GET_CATEGORIES, DELETE_CATEGORY, EDIT_CATEGORY, ADD_CATEGORY } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    case DELETE_CATEGORY:
      return state.filter(category => category.id !== action.payload);
    case EDIT_CATEGORY:
      // Clone the state
      const updatedState = [...state];

      for (let i = 0; i < updatedState.length; i++) {
        // If the current element matches the edited element, replace it
        if (updatedState[i].id === action.payload.id) {
          updatedState[i] = action.payload;
        }
      }

      return updatedState;
    case ADD_CATEGORY:
      return [...state, action.payload];
    default:
      return state;
  }
}
