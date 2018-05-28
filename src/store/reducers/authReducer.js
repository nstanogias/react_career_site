import { SET_CURRENT_USER } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !(action.payload), //check if empty
        user: action.payload
      };
    default:
      return state;
  }
}
