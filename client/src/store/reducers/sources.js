import { GET_SOURCES, DELETE_SOURCE, ADD_SOURCE } from '../actions/actionTypes';

const initialState = {
  sources: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_SOURCES:
      return {
        ...state,
        sources: action.payload
      };
    case DELETE_SOURCE:
      return {
        ...state,
        sources: state.sources.filter(source => source.id !== action.payload)
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