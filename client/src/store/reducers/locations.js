import { GET_LOCATIONS, DELETE_LOCATION, ADD_LOCATION } from '../actions/actionTypes';

const initialState = {
  locations: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(location => location.id !== action.payload)
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload]
      };
    default:
      return state;
  }
}