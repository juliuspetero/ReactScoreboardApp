import axios from 'axios';
import config from '../../../config/config';

import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE
} from '../actionsTypes/fetchReportActionTypes';

// Action creators returns the action object
export const fetchReport = id => {
  return dispatch => {
    dispatch(fetchReportRequest());
    axios
      .get(`${config.baseUrl}/reports/${id}`)
      .then(response => dispatch(fetchReportSuccess(response.data)))
      .catch(error => dispatch(fetchReportFailure(error.response)));
  };
};

export const fetchReportRequest = () => {
  return {
    type: FETCH_REPORT_REQUEST
  };
};

export const fetchReportSuccess = reports => {
  return {
    type: FETCH_REPORT_SUCCESS,
    payload: reports
  };
};

export const fetchReportFailure = error => {
  return {
    type: FETCH_REPORT_FAILURE,
    payload: error
  };
};
