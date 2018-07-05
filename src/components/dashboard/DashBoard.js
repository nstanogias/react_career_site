import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class DashBoard extends Component {

  render() {
    const {user} = this.props.auth;
    console.log(user);
    let dashboardContent;

    dashboardContent = (
      <div>
        <p className="lead text-muted">Welcome {user.name}</p>
      </div>
    );

     let buttons = ( <Link to="/jobs" className="btn btn-lg btn-info">
        Current Jobs
      </Link>);


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
    auth: state.auth
  }
};

export default connect(mapStateToProps, null)(DashBoard);