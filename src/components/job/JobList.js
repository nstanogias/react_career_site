import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchJobs } from "../../store/actions/actions";
import BpTable from './BpTable';
import Loader from '../common/Spinner';

class JobList extends Component {

  componentWillMount(){
    this.props.fetchJobs();
  }

  render() {

    let jobs = <Loader/>;

    if (!this.props.loading) {
      jobs = <BpTable/>;
    }
    return (
      <div>
        <h2>Jobs list</h2>
        {jobs}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    jobs: state.jobs.jobs,
    loading:state.jobs.loading
});

export default connect(mapStateToProps, {fetchJobs})(JobList);