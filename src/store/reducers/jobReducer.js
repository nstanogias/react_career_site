import * as actionType from "../actions/actionTypes";

const initialState = {
  jobs: [],
  job: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionType.FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.jobs,
        loading: false
      };
    case actionType.FETCH_JOBS_START:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_JOB:
      return{
        ...state,
        job: action.payload
      };
    default:
      return state;
  }


}

