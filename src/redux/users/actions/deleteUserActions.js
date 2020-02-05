import axios from 'axios';
import config from '../../../config/config';

import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from '../actionsTypes/deleteUserActionTypes';

// Action creators returns the action object
export const deleteUser = id => {
  return dispatch => {
    dispatch(deleteUserRequest());
    axios
      .delete(`${config.baseUrl}/users/${id}`)
      .then(response => {
        // response.data is the users
        const deletedUser = response.data;
        dispatch(deleteUserSuccess(deletedUser));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(deleteUserFailure(error.message));
      });
  };
};

export const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST
  };
};

export const deleteUserSuccess = deletedUser => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: deleteUser
  };
};

export const deleteUserFailure = error => {
  return {
    type: DELETE_USER_FAILURE,
    payload: error
  };
};
