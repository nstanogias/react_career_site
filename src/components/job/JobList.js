import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchJobs, addJob } from "../../store/actions/actions";
import JobListTable from './JobListTable';
import Loader from '../common/Spinner';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { Dropdown } from 'semantic-ui-react'

class JobList extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      category: '',
      country: '',
      city: '',
      description: ''
    };

    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchJobs();
  }

  addJobHandler = () => {
    console.log(this.state);
    const newJob = {
      title: this.state.title,
      category: this.state.category,
      country: this.state.country,
      city: this.state.city,
      description: this.state.description
    };

    this.props.addJob(newJob);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { jobs, loading } = this.props.jobs;
    const { isAuthenticated } = this.props.auth;

    // Select options for status
    const categoryOptions = [
      { label: 'Choose career area', value: 'Choose career area' },
      { label: 'Financial', value: 'Financial' },
      { label: 'Intern', value: 'Intern' },
      { label: 'IT', value: 'IT' }
    ];

    // Select options for country
    const countryOptions = [
      { label: 'Choose country', value: 'Choose country'},
      { label: 'Denmark', value: 'Denmark' },
      { label: 'Sweden', value: 'Sweden' },
      { label: 'Norway', value: 'Norway' }
    ];

    // Select options for city
    const cityOptions = [
      { label: 'Choose city', value: 'Choose city'},
      { label: 'Copenhagen', value: 'Copenhagen' },
      { label: 'Stockholm', value: 'Stockholm' },
      { label: 'Oslo', value: 'Oslo' }
    ];

    const countryOptions1 = [ { key: 'dk', value: 'dk', flag: 'dk', text: 'Denmark' }, { key: 'gr', value: 'gr', flag: 'gr', text: 'Greece' }  ]

    let content = <Loader/>;

    if (!loading) {
      content = <JobListTable jobs={jobs} />;
    }
    return (
      <div>
        <div className="row mb-5" style={{width: '70%',backgroundColor: '#FDECE5'}}>
          <div className="col-md-4 mt-4 mb-4 dropdown-wrapper">
            <Dropdown className="dropdown" placeholder='Select Country' search selection options={countryOptions1} />
            <Dropdown className="dropdown" placeholder='Select Country' search selection options={countryOptions1} />
          </div>
          <div className="col-md-4 mt-4 mb-4">
            <Dropdown placeholder='Select Country' search selection options={countryOptions1} />
          </div>
          <div className="col-md-4 mt-4 mb-4 align-self-end">
            <Dropdown placeholder='Select Country' search selection options={countryOptions1} />
          </div>
        </div>
        <h2 style={{textAlign: 'center', marginTop: '4px' }}>Jobs list</h2>
        {content}
        {isAuthenticated ? (
            <button
              type="button" className="btn btn-primary"
              data-toggle="modal" data-target="#exampleModal"
            >
              Add job
            </button>
          )
          : null
        }
        <div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">New Job Details</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <TextFieldGroup
                      name="title"
                      value={this.state.title}
                      type="text"
                      onChange={this.onChange}
                      label="Job title"
                    />
                    <SelectListGroup
                      placeholder="Career area"
                      name="category"
                      value={this.state.category}
                      onChange={this.onChange}
                      options={categoryOptions}
                    />
                    <SelectListGroup
                      placeholder="Country"
                      name="country"
                      value={this.state.country}
                      onChange={this.onChange}
                      options={countryOptions}
                    />
                    <SelectListGroup
                      placeholder="City"
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                      options={cityOptions}
                    />
                    <TextAreaFieldGroup
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      placeholder="Job description"
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addJobHandler}>Add Job</button>
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

export default connect(mapStateToProps, { fetchJobs, addJob } )(JobList);