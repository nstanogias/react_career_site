import * as actionTypes from './actionTypes';
import axios from 'axios';


const fetchUsersJobsStart = () => {
  return {
    type: actionTypes.FETCH_USERS_JOBS_START
  }
};

const fetchUsersJobsSuccess = (userjobs) => {
  return {
    type: actionTypes.FETCH_USERS_JOBS_SUCCESS,
    userjobs
  }
};

export const addJobToUser = (userjobData) => {
  return dispatch => {
    axios.post('/api/userjobs', userjobData)
      .then(res => {
        dispatch({
          type: actionTypes.ADD_JOB_TO_USER,
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
};

export const fetchUsersJobs = () => {
  return dispatch => {
    dispatch(fetchUsersJobsStart());
    axios
      .get('/api/userjobs')
      .then(response => {
        console.log("users jobs are ", response.data);
        dispatch(fetchUsersJobsSuccess(response.data));
      })
      .catch(error =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: error.response.data
        })
      )
  }
};

export const getUserJobsByJobId = id => {
  return dispatch => {
    axios
      .get(`/api/userjobs/job/${id}`)
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_USERS_JOBS_BY_JOBID,
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

export const getUserJobsByUserId = id => {
  return dispatch => {
    axios
      .get(`/api/userjobs/user${id}`)
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_USERS_JOBS_BY_USERID,
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