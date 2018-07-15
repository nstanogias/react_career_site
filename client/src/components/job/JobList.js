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
      newTitle: '',
      newCategory: '',
      newCountry: '',
      newCity: '',
      newDescription: '',
      selectedCountry: '',
      selectedCity: '',
      selectedCategory: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchJobs();
  }

  addJobHandler = () => {
    const newJob = {
      title: this.state.newTitle,
      category: this.state.newCategory,
      country: this.state.newCountry,
      city: this.state.newCity,
      description: this.state.newDescription
    };

    this.props.addJob(newJob);
  };

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value});

  clearFilters = () => {
    this.setState({
      category: '',
      country: '',
      city: '',
    })
  };


  render() {
    const {jobs, loading} = this.props.jobs;
    const {isAuthenticated, user} = this.props.auth;

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
      {key: 'all', value: 'all', text: 'Choose country'},
      {key: 'Denmark', value: 'Denmark', flag: 'dk', text: 'Denmark'},
      {key: 'Greece', value: 'Greece', flag: 'gr', text: 'Greece'},
      {key: 'Sweden', value: 'Sweden', flag: 'se', text: 'Sweden'},
      {key: 'Norway', value: 'Norway', flag: 'no', text: 'Norway'}
    ];

    const cityOptions1 = {
      Denmark: [{key: 'all', value: 'all', text: 'Choose city'},
        {key: 'cph', value: 'Copenhagen', text: 'Copenhagen'},
        {key: 'ar', value: 'Arhus', text: 'Arhus'}
      ],
      Sweden: [{key: 'all', value: 'all', text: 'Choose city'},
        {key: 'st', value: 'Stockholm', text: 'Stockholm'},
        {key: 'lu', value: 'Lund', text: 'Lund'}
      ],
      Norway: [{key: 'all', value: 'all', text: 'Choose city'},
        {key: 'os', value: 'Oslo', text: 'Oslo'},
        {key: 'br', value: 'Bergen', text: 'Bergen'}
      ],
      Greece: [{key: 'all', value: 'all', text: 'Choose city'},
        {key: 'th', value: 'Thessaloniki', text: 'Thessaloniki'},
        {key: 'ath', value: 'Athens', text: 'Athens'}
      ]
    };

    const categoryOptions1 = [
      {key: 'all', value: 'all', text: 'Choose career area'},
      {key: 'it', value: 'IT', text: 'IT'},
      {key: 'fin', value: 'Financial', text: 'Financial'},
      {key: 'in', value: 'Intern', text: 'Intern'},
      {key: 'hr', value: 'Human Resources', text: 'Human Resources'}
    ];

    let content = <Loader/>;

    let filteredJobs = jobs;

    if (this.state.selectedCountry !== '' && this.state.selectedCountry !== 'all') {
      filteredJobs = filteredJobs.filter(job => {
        return job.country === this.state.selectedCountry
      });
      if (this.state.selectedCity !== '' && this.state.selectedCity !== 'all') {
        filteredJobs = filteredJobs.filter(job => {
          return job.city === this.state.selectedCity
        });
      }
    }

    if (this.state.selectedCategory !== '' && this.state.selectedCategory !== 'all') {
      filteredJobs = filteredJobs.filter(job => {
        return job.category === this.state.selectedCategory
      });
    }

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
              name='selectedCountry'
              onChange={this.handleChange}
            />
            <Dropdown
              className="dropdown"
              placeholder='Choose City'
              search
              selection
              disabled={this.state.selectedCountry === '' || this.state.selectedCountry === 'all'}
              options={cityOptions1[this.state.selectedCountry]}
              name='selectedCity'
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-4 mt-4 mb-4">
            <Dropdown
              placeholder='Choose Career area'
              search
              selection
              options={categoryOptions1}
              name='selectedCategory'
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-4 mt-4 mb-4 align-self-end">
            <button type="button" className="btn btn-link" style={{color: '#0000a0'}} onClick={this.clearFilters}>Clear
              all filters
            </button>
            <button type="button" className="btn btn-primary search-btn">Search</button>
          </div>
        </div>
        <h2 style={{textAlign: 'center', marginTop: '4px'}}>Jobs list</h2>
        {content}
        {(isAuthenticated && user.role === 1) ? (
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
                      name="newTitle"
                      value={this.state.newTitle}
                      type="text"
                      onChange={this.onChange}
                      label="Job title"
                    />
                    <SelectListGroup
                      placeholder="Career area"
                      name="newCategory"
                      value={this.state.newCategory}
                      onChange={this.onChange}
                      options={categoryOptions}
                    />
                    <SelectListGroup
                      placeholder="Country"
                      name="newCountry"
                      value={this.state.newCountry}
                      onChange={this.onChange}
                      options={countryOptions}
                    />
                    <SelectListGroup
                      placeholder="City"
                      name="newCity"
                      value={this.state.newCity}
                      onChange={this.onChange}
                      options={cityOptions}
                    />
                    <TextAreaFieldGroup
                      name="newDescription"
                      value={this.state.newDescription}
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

const mapStateToProps = state => {
  return {
    jobs: state.jobs,
    auth: state.auth
  }
};

export default connect(mapStateToProps, {fetchJobs, addJob})(JobList);