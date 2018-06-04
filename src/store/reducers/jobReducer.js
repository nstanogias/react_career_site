import { FETCH_JOBS_SUCCESS } from "../actions/actionTypes";

const initialState = {
  jobs: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.jobs
      };
    default:
      return state;
  }
}

