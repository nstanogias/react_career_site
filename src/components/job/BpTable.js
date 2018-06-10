import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BpTable extends Component {

  render() {

    const { jobs } = this.props;

    let data = jobs.map(job => (
      <tr key={job._id}>
        <td><Link to={`/job/${job._id}`}>{job.title}</Link></td>
        <td>{job.category}</td>
        <td>{job.city + ', ' + job.country}</td>
      </tr>
    ));


    return(
      <div>
        <table className="table">
          <thead>
          <tr>
            <th>Job Title</th>
            <th>Career area</th>
            <th>Location</th>
          </tr>
          {data}
          </thead>
        </table>
      </div>
    )
  }
}

export default BpTable;