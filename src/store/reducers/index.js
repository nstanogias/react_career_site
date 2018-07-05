import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import jobReducer from './jobReducer';
import userjobsReducer from './userjobsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  jobs: jobReducer,
  userjobs: userjobsReducer
});
