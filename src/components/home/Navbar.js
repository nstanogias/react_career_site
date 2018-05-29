import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from  'prop-types';
import { logoutUser } from "../../store/actions/actions";

class Navbar extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    // this.props.history.push('/');
  };

  render() {

    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            href=""
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
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
    );

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

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth:state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
