import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {/*<img src="../../assets/images/img3.png" width="160" height="40"/>*/}
            {/*<img src="../../assets/images/im.png" className="img-fluid" style={{height: 'auto', maxWidth: '100%', objectFit: 'contain'}}/>*/}
            Nordea
            </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
