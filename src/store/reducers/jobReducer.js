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
      return {
        ...state,
        job: action.payload
      };
    case actionType.ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case actionType.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== job.payload)
      };
    default:
      return state;
  }


}

