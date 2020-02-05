import axios from 'axios';
import config from '../../../config/config';
import validateInput from '../../../helpers/validateAuthenticateUser';
import jwt from 'jsonwebtoken';

import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE
} from '../actionsTypes/authenticateUserTypes';

// Action creators returns the action object
export const authenticateUser = user => {
  return dispatch => {
    dispatch(authenticateUserRequest());
    // Write client side validation here
    const { errors, isValid } = validateInput(user);
    if (!isValid) dispatch(authenticateUserFailure({ data: errors }));
    else {
      axios
        .post(`${config.baseUrl}/accounts/login`, user)
        .then(response => {
          // Decode the token and set the user information redux store
          const userInformation = jwt.decode(response.data.token)
            .userInformation;
          // console.log(response.data);
          dispatch(
            authenticateUserSuccess({
              token: response.data.token,
              userInformation
            })
          );
        })
        .catch(error => {
          // console.log(error.response.status);
          dispatch(authenticateUserFailure(error.response));
        });
    }
  };
};

export const authenticateUserRequest = () => {
  return {
    type: AUTHENTICATE_USER_REQUEST
  };
};

export const authenticateUserSuccess = user => {
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    payload: user
  };
};

export const authenticateUserFailure = errors => {
  return {
    type: AUTHENTICATE_USER_FAILURE,
    payload: errors
  };
};
