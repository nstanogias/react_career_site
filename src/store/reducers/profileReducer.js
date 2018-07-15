import * as actionType from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionType.PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionType.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case actionType.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case actionType.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}