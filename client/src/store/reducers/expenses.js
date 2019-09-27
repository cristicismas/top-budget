import { GET_EXPENSES, DELETE_EXPENSE, ADD_EXPENSE } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return action.payload;
    case DELETE_EXPENSE:
      return state.filter(expense => expense.id !== action.payload);
    case ADD_EXPENSE:
      return [...state, action.payload];
    default:
      return state;
  }
}
