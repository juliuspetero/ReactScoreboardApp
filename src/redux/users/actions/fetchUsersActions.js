import axios from 'axios';
import config from '../../../config/config';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
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
