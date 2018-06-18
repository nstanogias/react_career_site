import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addJobToUser = (userjobData) => {
  return dispatch => {
    axios.post('/api/userjobs', userjobData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
};

// export const acceptUserToJob