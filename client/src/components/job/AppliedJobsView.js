import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserJobsByUserId, fetchUsersJobs} from "../../store/actions/userJobsActionsCreator";
import {getJobById, fetchJobs} from "../../store/actions/jobActionCreator";

class AppliedJobsView extends Component {

  componentWillMount() {
    if (this.props.auth.user.role === 1) {
      this.props.fetchUsersJobs();
      this.props.fetchJobs();
    } else {
      this.props.getUserJobsByUserId(this.props.auth.user.id);
      this.props.fetchJobs();
    }
  }

  groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  render() {

    const {userjobs} = this.props.userjobs;
    const {jobs} = this.props.jobs;

    // Group userjobs by jobId
    let groupedUserJobs = this.groupBy(userjobs, 'jobId');

    let jobsAdmin = [];

    Object.entries(groupedUserJobs).forEach(([key, value]) => {
        jobs.forEach(job => {
          if (key === job._id) {
            let j = {};
            let users = [];
            value.forEach(val => {
              users.push(val.profileNickname)
            });
            j.id = job._id;
            j.title = job.title;
            j.category = job.category;
            j.country = job.country;
            j.city = job.city;
            j.users = users;

            jobsAdmin.push(j);
          }
        })
      }
    );

    let data = null;

    if (this.props.auth.user.role === 1) {
      data = jobsAdmin.map(job => (
          <tr>
            <td>{job.title}</td>
            <td>{job.category}</td>
            <td>{job.city + ', ' + job.country}</td>
            <td>
              <ul className="list-group">{job.users.map((user, index) =>
                (
                  <li key={index} className="list-group-item"><Link to={`/profile/${user}`}>{user}</Link></li>
                )
              )}
              </ul>
            </td>
          </tr>
        )
      )
    } else {

      let jobsToDisplay = [];
      userjobs.forEach(userjob => {
        jobs.forEach(job => {
          if (userjob.jobId === job._id) {
            job.status = userjob.isAccepted;
            jobsToDisplay.push(job);
          }
        })
      });

      if (jobsToDisplay.length > 0) {
        data = jobsToDisplay.map(job => (
          <tr>
            <td>{job.title}</td>
            <td>{job.category}</td>
            <td>{job.city + ', ' + job.country}</td>
            <td>{job.status === 0 ? <p className="text-primary">Pending</p>
              : job.status < 0 ? <p className="text-danger">Rejected</p>
                : <p className="text-success">Accepted</p>}
            </td>
          </tr>
        ));
      }
    }

    let titleMsg = this.props.auth.user.role === 1 ? "These are the job applications" : "You have applied for the following jobs";
    return (
      <div>
        <div className="container">
          <h1 style={{textAlign: 'center'}}>{titleMsg}</h1>
          <div className="row mt-5">
            <table className="table">
              <thead>
              <tr>
                <th>Job Title</th>
                <th>Career area</th>
                <th>Location</th>
                {this.props.auth.user.role === 1 ? (<th>Applied By</th>) : (<th>Status</th>)}
              </tr>
              {data}
              </thead>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    jobs: state.jobs,
    userjobs: state.userjobs
  }
};

export default connect(mapStateToProps, {
  getUserJobsByUserId,
  fetchUsersJobs,
  getJobById,
  fetchJobs,
})(AppliedJobsView);