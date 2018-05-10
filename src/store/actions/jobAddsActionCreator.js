import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchJobAddsStart = () => {
  return {
    type: actionTypes.FETCH_JOB_ADDS_START
  }
};

const fetchJobAddsSuccess = (jobAdds) => {
  return {
    type: actionTypes.FETCH_JOB_ADDS_SUCCESS,
    jobAdds
  }
};

const fetchJobAddsFail = (error) => {
  return {
    type: actionTypes.FETCH_JOB_ADDS_FAIL,
    error
  }
};

export const fetchJobAdds = () => {
  return dispatch => {
    dispatch(fetchJobAddsStart());

    axios.get('/api/jobAdds')
      .then(response => {
          const fetchedJobAdds = [];
          console.log(response.data);
          for (let key in response.data) {
            fetchedJobAdds.push({
              ...response.data[key],
              id:key
            });
          }
          dispatch(fetchJobAddsSuccess(fetchedJobAdds));
        }
      )
      .catch(error => {
        dispatch(fetchJobAddsFail(error));
      });
  }
};