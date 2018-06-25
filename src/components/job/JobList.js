import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchJobs, addJob} from "../../store/actions/actions";
import JobListTable from './JobListTable';
import Loader from '../common/Spinner';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {Dropdown} from 'semantic-ui-react'

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
    this.setState({[e.target.name]: e.target.value});
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


  render() {
    const {jobs, loading} = this.props.jobs;
    const {isAuthenticated} = this.props.auth;

    // Select options for status
    const categoryOptions = [
      {label: 'Choose career area', value: 'Choose career area'},
      {label: 'Financial', value: 'Financial'},
      {label: 'Intern', value: 'Intern'},
      {label: 'IT', value: 'IT'}
    ];

    // Select options for country
    const countryOptions = [
      {label: 'Choose country', value: 'Choose country'},
      {label: 'Denmark', value: 'Denmark'},
      {label: 'Sweden', value: 'Sweden'},
      {label: 'Norway', value: 'Norway'}
    ];

    // Select options for city
    const cityOptions = [
      {label: 'Choose city', value: 'Choose city'},
      {label: 'Copenhagen', value: 'Copenhagen'},
      {label: 'Stockholm', value: 'Stockholm'},
      {label: 'Oslo', value: 'Oslo'}
    ];

    const countryOptions1 = [
      {key: 'Denmark', value: 'Denmark', flag: 'dk', text: 'Denmark'},
      {key: 'Greece', value: 'Greece', flag: 'gr', text: 'Greece'},
      {key: 'Sweden', value: 'Sweden', flag: 'se', text: 'Sweden'},
      {key: 'Norway', value: 'Norway', flag: 'no', text: 'Norway'}
    ];

    const cityOptions1 = {
      Denmark: [{key: 'cph', value: 'Copenhagen', text: 'Copenhagen'}, {key: 'ar', value: 'Arhus', text: 'Arhus'}],
      Sweden: [{key: 'st', value: 'Stockholm', text: 'Stockholm'}, {key: 'lu', value: 'Lund', text: 'Lund'}],
      Norway: [{key: 'os', value: 'Oslo', text: 'Oslo'}, {key: 'br', value: 'Bergen', text: 'Bergen'}],
      Greece: [{key: 'th', value: 'Thessaloniki', text: 'Thessaloniki'}, {key: 'ath', value: 'Athens', text: 'Athens'}]
    };

    const categoryOptions1 = [
      {key: 'it', value: '', text: 'IT'},
      {key: 'fin', value: '', text: 'Finance'},
      {key: 'in', value: 'in', text: 'Intern'},
      {key: 'hr', value: 'hr', text: 'Human Resources'}
      ];


    console.log(cityOptions1[this.state.country]);
    console.log("country is", this.state.country);

    let content = <Loader/>;

    let filteredJobs = jobs.filter(job => {
      return job.country === this.state.country &&
        job.city === this.state.city
    });

    if (!loading) {
      content = <JobListTable jobs={filteredJobs}/>;
    }

    return (
      <div>
        <div className="row mb-5" style={{width: '70%', backgroundColor: '#FDECE5'}}>
          <div className="col-md-4 mt-4 mb-4 dropdown-wrapper">
            <Dropdown
              className="dropdown"
              placeholder='Choose Country'
              search
              selection
              options={countryOptions1}
              name='country'
              onChange={this.handleChange}
            />
            <Dropdown
              className="dropdown"
              placeholder='Choose City'
              search
              selection
              options={cityOptions1[this.state.country]}
              name='city'
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-4 mt-4 mb-4">
            <Dropdown
              placeholder='Choose Career area'
              search
              selection
              options={categoryOptions1}
              name='category'
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-4 mt-4 mb-4 align-self-end">
            <button type="button" className="btn btn-link">Clear filters</button>
            <button type="button" className="btn btn-primary rounded" style={{borderRadius: '50%'}}>Search</button>
          </div>
        </div>
        <h2 style={{textAlign: 'center', marginTop: '4px'}}>Jobs list</h2>
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
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
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
                  <button type="button" className="btn btn-primary" data-dismiss="modal"
                          onClick={this.addJobHandler}>Add Job
                  </button>
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
  auth: state.auth
});

export default connect(mapStateToProps, {fetchJobs, addJob})(JobList);