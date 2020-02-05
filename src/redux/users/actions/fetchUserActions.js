import axios from 'axios';
import config from '../../../config/config';

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../actionsTypes/fetchUserActionTypes';

// Action creators returns the action object
export const fetchUser = id => {
  return dispatch => {
    dispatch(fetchUserRequest());
    axios
      .get(`${config.baseUrl}/users/${id}`)
      .then(response => dispatch(fetchUserSuccess(response.data)))
      .catch(error => dispatch(fetchUserFailure(error.response)));
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST
  };
};

export const fetchUserSuccess = user => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user
  };
};

export const fetchUserFailure = error => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  };
};
