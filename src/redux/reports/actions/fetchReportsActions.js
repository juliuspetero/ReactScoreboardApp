import axios from 'axios';
import config from '../../../config/config';

import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE
} from '../actionsTypes/fetchReportsActionTypes';

// Action creators returns the action object
export const fetchReports = id => {
  return dispatch => {
    dispatch(fetchReportsRequest());
    axios
      .get(`${config.baseUrl}/reports/scoreboard/${id}`)
      .then(response => dispatch(fetchReportsSuccess(response.data)))
      .catch(error => dispatch(fetchReportsFailure(error.response)));
  };
};

export const fetchReportsRequest = () => {
  return {
    type: FETCH_REPORTS_REQUEST
  };
};

export const fetchReportsSuccess = reports => {
  return {
    type: FETCH_REPORTS_SUCCESS,
    payload: reports
  };
};

export const fetchReportsFailure = error => {
  return {
    type: FETCH_REPORTS_FAILURE,
    payload: error
  };
};
