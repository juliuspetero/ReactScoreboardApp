import axios from 'axios';
import config from '../../../config/config';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_FETCH_SEARCH_EMPLOYEES_FAILURE,
  FETCH_FETCH_SEARCH_EMPLOYEES_SUCCESS,
  FETCH_FETCH_SEARCH_EMPLOYEES_REQUEST
} from '../actionsTypes/fetchUsersActionTypes';

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .get(`${config.baseUrl}/users`)
      .then(response => dispatch(fetchUsersSuccess(response.data)))
      .catch(error => dispatch(fetchUsersFailure(error.response)));
  };
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

// SEARCH EMPLOYEES SECTION
export const fetchSearchEmployees = query => {
  return dispatch => {
    dispatch(fetchSearchEmployeesRequest());
    axios
      .get(`${config.baseUrl}/users/search?query=${query}`)
      .then(response => dispatch(fetchSearchEmployeesSuccess(response.data)))
      .catch(error => dispatch(fetchSearchEmployeesFailure(error.response)));
  };
};

export const fetchSearchEmployeesRequest = () => {
  return {
    type: FETCH_FETCH_SEARCH_EMPLOYEES_REQUEST
  };
};

export const fetchSearchEmployeesSuccess = users => {
  return {
    type: FETCH_FETCH_SEARCH_EMPLOYEES_SUCCESS,
    payload: users
  };
};

export const fetchSearchEmployeesFailure = error => {
  return {
    type: FETCH_FETCH_SEARCH_EMPLOYEES_FAILURE,
    payload: error
  };
};
