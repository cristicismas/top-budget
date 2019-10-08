import { GET_EXPENSES, DELETE_EXPENSE, ADD_EXPENSE, EDIT_EXPENSE } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return action.payload;
    case DELETE_EXPENSE:
      return state.filter(expense => expense.id !== action.payload);
    case ADD_EXPENSE:
      return [...state, action.payload];
    case EDIT_EXPENSE:
      // Clone the state
      const updatedState = [...state];
      
      for (let i = 0; i < updatedState.length; i++) {
        // If the current element matches the edited element, replace it
        if (updatedState[i].id === action.payload.id) {
          updatedState[i] = action.payload;
        }
      }
      
      return updatedState;
    default:
      return state;
  }
}
