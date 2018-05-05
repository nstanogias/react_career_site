import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getJobAdds } from '../store/actions/actions';
import * as actions from '../store/actions/actions';

class HomeContainer extends Component {

    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return {
        fetchJobAdds: () => dispatch(actions.fetchJobAdds())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);