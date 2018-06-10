import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchJobsStart = () => {
  return {
    type: actionTypes.FETCH_JOBS_START
  }
};

const fetchJobsSuccess = (jobs) => {
  return {
    type: actionTypes.FETCH_JOBS_SUCCESS,
    jobs: jobs
  }
};

export const fetchJobs = () => {
  return dispatch => {
    dispatch(fetchJobsStart());
    axios
      .get('/api/jobs')
      .then(response => {
        console.log("jobs are ", response.data);
        dispatch(fetchJobsSuccess(response.data));
      })
      .catch(error =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: error.response.data
        })
      )
  }
};

export const getJobById = id => {
  return dispatch => {
    axios
      .get(`/api/jobs/${id}`)
      .then(res => {
        console.log("job is ", res.data);
        dispatch({
          type: actionTypes.FETCH_JOB,
          payload: res.data
        })
      })
      .catch(err =>
        dispatch({
          type: actionTypes.FETCH_JOB,
          payload: null
        })
      )
  }
};

export const addJob = jobData => {
  return dispach => {
    axios.post('/api/jobs/', jobData)
      .then(res => {
        dispach({
          type: actionTypes.ADD_JOB,
          payload: res.data
        })
      })
  }
};