import { GET_EXPENSES, DELETE_EXPENSE, ADD_EXPENSE } from '../actions/actionTypes';

const initialState = {
  expenses: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };
    default:
      return state;
  }
}