import axios from 'axios';
import config from '../../../config/config';

import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE
} from '../actionsTypes/editUserActionTypes';

// Action creators returns the action object
export const editUser = user => {
  return dispatch => {
    dispatch(editUserRequest());
    axios
      .put(`${config.baseUrl}/users/`)
      .then(response => dispatch(editUserSuccess(response.data)))
      .catch(error => dispatch(editUserFailure(error.message)));
  };
};

export const editUserRequest = () => {
  return {
    type: EDIT_USER_REQUEST
  };
};

export const editUserSuccess = editedUser => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: editedUser
  };
};

export const editUserFailure = error => {
  return {
    type: EDIT_USER_FAILURE,
    payload: error
  };
};
