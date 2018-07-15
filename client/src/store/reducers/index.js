import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import jobReducer from './jobReducer';
import userjobsReducer from './userjobsReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  jobs: jobReducer,
  userjobs: userjobsReducer,
  profile: profileReducer
});
