import {
  GET_EXPENSES,
  DELETE_EXPENSE,
  ADD_EXPENSE,
  GET_CATEGORIES,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  GET_LOCATIONS,
  DELETE_LOCATION,
  ADD_LOCATION,
  GET_SOURCES,
  DELETE_SOURCE,
  ADD_SOURCE
} from '../actions/actionTypes';

const initialState = {
  expenses: [],
  categories: [],
  locations: [],
  sources: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          expense => expense.id !== action.payload
        )
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.id !== action.payload
        )
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };

    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          location => location.id !== action.payload
        )
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload]
      };

    case GET_SOURCES:
      return {
        ...state,
        sources: action.payload
      };
    case DELETE_SOURCE:
      return {
        ...state,
        sources: state.sources.filter(
          source => source.id !== action.payload
        )
      };
    case ADD_SOURCE:
      return {
        ...state,
        sources: [...state.sources, action.payload]
      };

    default:
      return state;
  }
}
