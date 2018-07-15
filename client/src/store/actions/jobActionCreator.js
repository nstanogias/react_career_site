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
        dispatch({
          type: actionTypes.FETCH_JOB,
          payload: res.data
        });
        return res.data;
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
  return dispatch => {
    axios.post('/api/jobs/', jobData)
      .then(res => {
        dispatch({
          type: actionTypes.ADD_JOB,
          payload: res.data
        })
      })
      .catch(err =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const deleteJob = id => {
  return dispatch => {
    axios.delete(`/api/jobs/${id}`)
      .then(res => {
        dispatch({
          type: actionTypes.DELETE_JOB,
          payload: id
        })
      })
      .catch(err =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        })
      )
  }
};