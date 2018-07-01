import * as actionType from "../actions/actionTypes";

const initialState = {
  userjobs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionType.FETCH_USERS_JOBS_SUCCESS:
      return {
        ...state,
        userjobs: action.userjobs
      };
    case actionType.FETCH_USERS_JOBS_BY_JOBID:
      return {
        ...state,
        userjobs: action.payload
      };
    case actionType.FETCH_USERS_JOBS_BY_USERID:
      return {
        ...state,
        userjobs: action.payload
      };
    case actionType.ADD_JOB_TO_USER:
      return {
        ...state,
        userjobs: [action.payload, ...state.userjobs]
      };
    default:
      return state;
  }
}