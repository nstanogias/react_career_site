import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addJobToUser = (userjobData) => {
  return dispatch => {
    axios.post('api/userjobs', userjobData)
  }
};

// export const acceptUserToJob