import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddJob extends Component {
  state = {
    formDate: {
      name:'',
      category:'',
      city:''
    }
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = state => {
 return {
   jobAdds: state.jobs.jobAdds
 }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);