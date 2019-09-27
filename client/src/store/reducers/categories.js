import { GET_CATEGORIES, DELETE_CATEGORY, ADD_CATEGORY } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    case DELETE_CATEGORY:
      return state.filter(category => category.id !== action.payload);
    case ADD_CATEGORY:
      return [...state, action.payload];
    default:
      return state;
  }
}
