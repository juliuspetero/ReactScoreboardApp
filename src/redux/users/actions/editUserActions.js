import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import config from '../../../config/config';
import validateEditEmployee from '../../../helpers/validateEditEmployee';

import {
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER_REQUEST
} from '../../users/actionsTypes/editUserActionTypes';

// Action creators returns the action object
export const editEmployeee = (id, employee) => {
  return dispatch => {
    dispatch(editEmployeeRequest());
    // Write client side validation here
    const { errors, isValid } = validateEditEmployee(cloneDeep(employee));
    // console.log(kpi);
    // return;
    if (!isValid) dispatch(editEmployeeFailure({ data: errors }));
    else {
      const formdata = new FormData();
      formdata.append('profilePhoto', employee.profilePhoto);
      formdata.append('username', employee.username);
      formdata.append('email', employee.email);
      formdata.append('phoneNumber', employee.phoneNumber);
      formdata.append('sex', employee.sex);
      formdata.append('address', employee.address);

      if (employee.password !== '') {
        formdata.append('password', employee.password);
        formdata.append('passwordConfirmation', employee.passwordConfirmation);
      }

      axios
        .put(
          `${config.baseUrl}/users/${id}`,
          employee.roles ? employee : formdata
        )
        .then(response => {
          // console.log(response);
          if (response.data) dispatch(editEmployeeSuccess(response.data));
          else
            dispatch(
              editEmployeeFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
        })
        .catch(error => {
          if (error.response) {
            if (isObject(error.response.data))
              dispatch(editEmployeeFailure(error.response));
            else
              dispatch(
                editEmployeeFailure({
                  data: {
                    message: 'Something occur try again later...'
                  }
                })
              );
          } else {
            dispatch(
              editEmployeeFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
          }
        });
    }
  };
};

export const editEmployeeRequest = () => {
  return {
    type: EDIT_USER_REQUEST
  };
};

export const editEmployeeSuccess = kpi => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: kpi
  };
};

export const editEmployeeFailure = errors => {
  return {
    type: EDIT_USER_FAILURE,
    payload: errors
  };
};
