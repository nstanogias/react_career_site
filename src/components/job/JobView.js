import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getJobById, deleteJob } from "../../store/actions/jobActionCreator";
import { Message } from 'semantic-ui-react'
import { addJobToUser} from "../../store/actions/userJobsActionsCreator";
import { getUserJobsByJobId } from "../../store/actions/userJobsActionsCreator";

class JobView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msgVisibility: false
    }
  }

  componentWillMount() {
    this.props.getUserJobsByJobId(this.props.match.params.id);
    console.log("id is ", this.props.match.params.id);
    if (this.props.match.params.id) {
      this.props.getJobById(this.props.match.params.id);
    }
  }

  handleDismiss = () => {
    this.setState({ msgVisibility: false })
  };

  applyJobHandler = (e) => {
    this.setState({msgVisibility: true});
    let userjobdata = {
      jobId: this.props.jobs.job._id,
      userId: this.props.auth.user.id
    };
    console.log(userjobdata);
    this.props.addJobToUser(userjobdata);
  };

  deleteJobHandler = () => {
    this.setState({msgVisibility: true});
    this.props.deleteJob(this.props.jobs.job._id);
  };

  render() {
    const { job } = this.props.jobs;
    const { isAuthenticated, user } = this.props.auth;
    const { userjobs } = this.props.userjobs;

    //check if this user has already applied for this job
    let userHasApplied = false;
    userjobs.forEach(userjob => {
      if(userjob.userId === user.id) {
        userHasApplied = true;
      }
    });

    //check if this job is deleted

    console.log("this user has applied", userHasApplied);

    let jobContent = null;

    let msg = (
      <Message success onDismiss={this.handleDismiss}>
        <Message.Header>You have successfully applied for this job</Message.Header>
      </Message>
    );

    if(!isAuthenticated) {
      msg = <Message warning onDismiss={this.handleDismiss}>
        <Message.Header>You must register before you can do that!</Message.Header>
        <p>Visit our registration page, then try again.</p>
      </Message>
    }

    if(isAuthenticated && user.role === 1) {
      msg = <Message success onDismiss={this.handleDismiss}>
        <Message.Header>You have successfully deleted this job</Message.Header>
      </Message>
    }

    if(job) {
      jobContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              {this.state.msgVisibility && msg}
              <Link to="/jobs" className="btn btn-light mb-3 float-left">
                Back To Jobs
              </Link>
            </div>
          </div>
          {userHasApplied && <h4 className="text-center text-success">You have applied for this job!</h4>}
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{job.title}</h3>
            <p className="lead"> {job.description} </p>
          </div>
          {user.role === 1 ? (
              <button
                // disabled={this.state.disabled}
                type="button"
                className="btn btn-danger"
                onClick={this.deleteJobHandler}
              >
                Delete this job
              </button>
            ) : (
              <button
                disabled={userHasApplied}
                type="button"
                className="btn btn-primary"
                onClick={this.applyJobHandler}
              >
                Apply for this job
              </button>
          )}
        </div>
      );
    }

    return (
      <div className="job">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{jobContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    jobs: state.jobs,
    userjobs: state.userjobs
  }
};

export default connect(mapStateToProps, { getJobById, addJobToUser, deleteJob, getUserJobsByJobId })(JobView);