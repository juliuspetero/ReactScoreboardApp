import axios from 'axios';
import config from '../../../config/config';
import {
  FETCH_ROLES_REQUEST,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE
} from '../actionsTypes/fetchRolesActionTypes';

export const fetchRoles = () => {
  return dispatch => {
    dispatch(fetchRolesRequest());
    axios
      .get(`${config.baseUrl}/roles`)
      .then(response => dispatch(fetchRolesSuccess(response.data)))
      .catch(error => dispatch(fetchRolesFailure(error.response)));
  };
};

export const fetchRolesRequest = () => {
  return {
    type: FETCH_ROLES_REQUEST
  };
};

export const fetchRolesSuccess = users => {
  return {
    type: FETCH_ROLES_SUCCESS,
    payload: users
  };
};

export const fetchRolesFailure = error => {
  return {
    type: FETCH_ROLES_FAILURE,
    payload: error
  };
};
