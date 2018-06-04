import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchJobsStart = () => {
  return {
    type: actionTypes.FETCH_JOBS_START
  }
};

const fetchJobsSuccess = (jobs) => {
  return {
    type:actionTypes.FETCH_JOBS_SUCCESS,
    jobs: jobs
  }
};

export const fetchJobs = () => {
  return dispatch => {
    dispatch(fetchJobsStart());
    axios.get('/api/jobs').then(response => {
      console.log("jobs are ", response.data);

    })
      .catch(error =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: error.response.data
        })
      )
  }
};