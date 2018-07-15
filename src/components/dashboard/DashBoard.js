import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile, deleteAccount} from "../../store/actions/profileActionCreator";
import Spinner from '../common/Spinner';

class DashBoard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick() {
    this.props.deleteAccount();
  }

  render() {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;

    let dashboardContent;

    let buttons = (<Link to="/jobs" className="btn btn-lg btn-info mt-4">
      View Current Jobs
    </Link>);

    if (profile === null || loading) {
      dashboardContent = <Spinner/>;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.nickname}`}>{user.name}</Link>
            </p>
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1"/> Edit Profile
            </Link>
            <div style={{marginBottom: '60px'}}/>
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            {user.role !== 1 && (
              <div>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-lg btn-info">
                  Create Profile
                </Link>
              </div>
            )}
          </div>
        );
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  }
};

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(DashBoard);