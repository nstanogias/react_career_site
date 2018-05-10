import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  jobAdds: [],
  loading: false,
  error: null
};

const fetchJobAddsStart = (state, action) => {
  return updateObject(state, {loading: true})
};

const fetchJobAddsSuccess = (state, action) => {
  return updateObject(state, {jobAdds: action.jobAdds, loading: false})
};

const fetchJobAddsFail = (state, action) => {
  return updateObject(state, {loading: false, error: action.error})
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_JOB_ADDS_START:
      return fetchJobAddsStart(state, action);
    case actionTypes.FETCH_JOB_ADDS_SUCCESS:
      return fetchJobAddsSuccess(state, action);
    case actionTypes.FETCH_JOB_ADDS_FAIL:
      return fetchJobAddsFail(state, action);
    default:
      return state;
  }
};

export default jobsReducer;