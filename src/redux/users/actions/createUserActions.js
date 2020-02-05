import axios from 'axios';
import config from '../../../config/config';
import validateInput from '../../../helpers/validateCreateUser';

import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE
} from '../actionsTypes/createUserActionTypes';

// Action creators returns the action object
export const createUser = user => {
  return dispatch => {
    dispatch(createUserRequest());
    // Write client side validation here
    const { errors, isValid } = validateInput(user);
    if (!isValid) dispatch(createUserFailure({ data: errors }));
    else {
      axios
        .post(`${config.baseUrl}/users`, user)
        .then(response => {
          // console.log(response.data);
          dispatch(createUserSuccess(response.data));
        })
        .catch(error => {
          if (error.response) dispatch(createUserFailure(error.response));
          else
            dispatch(
              createUserFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
        });
    }
  };
};

export const createUserRequest = () => {
  return {
    type: CREATE_USER_REQUEST
  };
};

export const createUserSuccess = user => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: user
  };
};

export const createUserFailure = errors => {
  return {
    type: CREATE_USER_FAILURE,
    payload: errors
  };
};
