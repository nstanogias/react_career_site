import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(loginUserStart());
  }

  axios.post('/api/login',{email,password})
    .then(response => {
      response.data
    })
    .catch(error = > {
     dispatch(loginUserFail(error));
  });
}