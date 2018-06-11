import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchJobs } from "../../store/actions/actions";
import BpTable from './BpTable';
import Loader from '../common/Spinner';

class JobList extends Component {

  constructor() {
    super();
    this.state = {
      modalVisible: false
    }
  }
  componentWillMount() {
    this.props.fetchJobs();
  }

  addJobHandler = () => {
    this.setState({modalVisible: true})
  };

  render() {
    const { jobs, loading } = this.props.jobs;
    const { isAuthenticated } = this.props.auth;

    // Select options for status
    const optionsCategory = [
      { label: '* Select Career area', value: 0 },
      { label: 'Financial', value: 'Financial' },
      { label: 'Intern', value: 'Intern' },
      { label: 'IT', value: 'IT' }
    ];

    // Select options for country
    const optionsCountry = [
      { label: '* country', value: 0 },
      { label: 'Denmark', value: 'Denmark' },
      { label: 'Sweden', value: 'Sweden' },
      { label: 'Norway', value: 'Norway' }
    ];

    // Select options for city
    const optionsCity = [
      { label: '* Select Career area', value: 0 },
      { label: 'Copenhagen', value: 'Copenhagen' },
      { label: 'Stockholm', value: 'Stockholm' },
      { label: 'Oslo', value: 'Oslo' }
    ];

    let content = <Loader/>;

    if (!loading) {
      content = <BpTable jobs={jobs} />;
    }
    return (
      <div>
        {isAuthenticated ? (
          <button
            type="button" class="btn btn-primary"
            data-toggle="modal" data-target="#exampleModal"
          >
            Add job
          </button>
        )
          : null
        }
        <h2>Jobs list</h2>
        {content}
        <div>
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">New Job Details</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">Recipient:</label>
                      <input type="text" class="form-control" id="recipient-name"/>
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="col-form-label">Message:</label>
                      <textarea class="form-control" id="message-text"></textarea>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary">Add Job</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    jobs: state.jobs,
    auth:state.auth
});

export default connect(mapStateToProps, { fetchJobs } )(JobList);