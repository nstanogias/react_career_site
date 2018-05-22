import * as actionTypes from './actionTypes';
import axios from 'axios';


export const loginUser = (email, password) => {
  // return dispatch => {
  //   dispatch(loginUserStart());
  // }

  const authData = {
    email: email,
    password: password
  };

  axios.post('/api/login', authData)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
     // dispatch(loginUserFail(error));
      console.log(error);
  })
};