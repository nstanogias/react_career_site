import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

import { Provider } from 'react-redux';
import store from './store/store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/actions';

import Navbar from './components/home/Navbar';
import Landing from './components/home/Landing';
import Footer from './components/home/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/DashBoard';
import PrivateRoute from './components/common/PrivateRoute';
import AddJob from './components/job/AddJob';
import JobList from './components/job/JobList';
import JobView from './components/job/JobView';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/jobs" component={JobList}/>
                <Route exact path="/jobs/:id" component={JobView}/>
                <Route exact path="/jobs/add" component={AddJob}/>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
              </div>
              <Footer />
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
