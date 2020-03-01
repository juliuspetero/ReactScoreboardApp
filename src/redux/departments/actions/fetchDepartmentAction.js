import axios from 'axios';
import config from '../../../config/config';
import {
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAILURE
} from '../actionsTypes/fetchDepartmentsActionTypes';

export const fetchDepartment = id => {
  return dispatch => {
    dispatch(fetchDepartmentsRequest());
    axios
      .get(`${config.baseUrl}/departments/${id}`)
      .then(response => dispatch(fetchDepartmentsSuccess(response.data)))
      .catch(error => dispatch(fetchDepartmentsFailure(error.response)));
  };
};

export const fetchDepartmentsRequest = () => {
  return {
    type: FETCH_DEPARTMENTS_REQUEST
  };
};

export const fetchDepartmentsSuccess = users => {
  return {
    type: FETCH_DEPARTMENTS_SUCCESS,
    payload: users
  };
};

export const fetchDepartmentsFailure = error => {
  return {
    type: FETCH_DEPARTMENTS_FAILURE,
    payload: error
  };
};
