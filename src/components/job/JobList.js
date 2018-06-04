import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchJobs } from "../../store/actions/actions";

class JobList extends Component {

  componentWillMount(){
    this.props.fetchJobs();
  }

  render() {
    return (
      <div>
        <h2>Jobs list</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    jobs: state.jobs
});

export default connect(mapStateToProps, {fetchJobs})(JobList);