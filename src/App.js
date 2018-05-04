import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import jobsReducer from './store/reducers/jobsReducers';
import userReducer from './store/reducers/userReducer';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    jobs: jobsReducer,
    user: userReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
