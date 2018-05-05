import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchJobAddsStart = () => {
    return {
        type: actionTypes.FETCH_JOB_ADDS_START
    }
};

const fetchJobAddsSuccess = () => {

};

const fetchJobAddsFail = () => {

};

export const fetchJobAdds = () => {
    return dispatch => {
        dispatch(fetchJobAddsStart());

        axios.get('/api/getJobAdds')
            .then(response => {
                    const fetchedJobAdds = [];
                    console.log(response.data);
                }
            )
    }
};