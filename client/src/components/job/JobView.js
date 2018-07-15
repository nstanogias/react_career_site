import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getJobById, deleteJob} from "../../store/actions/jobActionCreator";
import {Message} from 'semantic-ui-react'
import {addJobToUser} from "../../store/actions/userJobsActionsCreator";
import {getUserJobsByJobId} from "../../store/actions/userJobsActionsCreator";
import {getCurrentProfile, getProfiles} from "../../store/actions/profileActionCreator";

class JobView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msgVisibility: false
    }
  }

  componentWillMount() {
    this.props.getUserJobsByJobId(this.props.match.params.id);
    this.props.getCurrentProfile();
    this.props.getProfiles();
    if (this.props.match.params.id) {
      this.props.getJobById(this.props.match.params.id);
    }
  }

  handleDismiss = () => {
    this.setState({msgVisibility: false})
  };

  applyJobHandler = (e) => {
    this.setState({msgVisibility: true});
    let userjobdata = {
      jobId: this.props.jobs.job._id,
      userId: this.props.auth.user.id,
      profileNickname: this.props.profile.profile.nickname
    };
    this.props.addJobToUser(userjobdata);
  };

  showMessage = e => {
    this.setState({msgVisibility: true});
  };

  deleteJobHandler = () => {
    this.setState({msgVisibility: true});
    this.props.deleteJob(this.props.jobs.job._id);
  };

  render() {
    const {job} = this.props.jobs;
    const {isAuthenticated, user} = this.props.auth;
    const {userjobs} = this.props.userjobs;
    const {profiles} = this.props.profile;

    //check if this user has created a profile
    let userHasProfile = false;
    if(profiles) {
      profiles.forEach(profile => {
        if(profile.user._id === user.id) {
          userHasProfile = true;
        }
      });
    }

    //check if this user has already applied for this job
    let userHasApplied = false;
    userjobs.forEach(userjob => {
      if (userjob.userId === user.id) {
        userHasApplied = true;
      }
    });

    let jobContent = null;

    let msg = (
      <Message success onDismiss={this.handleDismiss}>
        <Message.Header>You have successfully applied for this job</Message.Header>
      </Message>
    );

    if (!isAuthenticated || !userHasProfile) {
      msg = <Message warning onDismiss={this.handleDismiss}>
        <Message.Header>You must register and create a profile before you can do that!</Message.Header>
        <p>Visit our registration page, then try again.</p>
      </Message>
    }

    if (isAuthenticated && user.role === 1) {
      msg = <Message success onDismiss={this.handleDismiss}>
        <Message.Header>You have successfully deleted this job</Message.Header>
      </Message>
    }

    if (job) {
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
              onClick={(isAuthenticated && userHasProfile) ? this.applyJobHandler : this.showMessage}
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
    userjobs: state.userjobs,
    profile: state.profile
  }
};

export default connect(mapStateToProps, {getJobById, addJobToUser, deleteJob, getUserJobsByJobId, getProfiles, getCurrentProfile})(JobView);