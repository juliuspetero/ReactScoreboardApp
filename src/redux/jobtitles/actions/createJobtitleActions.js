import axios from 'axios';
import isObject from 'lodash/isObject';
import config from '../../../config/config';
import validateCreateJobtitle from '../../../helpers/validateCreateJotitle';

import {
  CREATE_KPI_REQUEST,
  CREATE_KPI_SUCCESS,
  CREATE_KPI_FAILURE
} from '../../kpis/actionsTypes/createKPIActionTypes';

// Action creators returns the action object
export const createJobtitle = jobtitle => {
  // console.log(jobtitle);
  return dispatch => {
    dispatch(createKPIRequest());
    // Write client side validation here
    const { errors, isValid } = validateCreateJobtitle(jobtitle);
    // console.log(kpi);
    // return;
    if (!isValid) dispatch(createKPIFailure({ data: errors }));
    else {
      axios
        .post(`${config.baseUrl}/scoreboardlayouts`, jobtitle)
        .then(response => {
          // console.log(response);
          if (response.data) dispatch(createKPISuccess(response.data));
          else
            dispatch(
              createKPIFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
        })
        .catch(error => {
          if (error.response) {
            if (isObject(error.response.data))
              dispatch(createKPIFailure(error.response));
            else
              dispatch(
                createKPIFailure({
                  data: {
                    message: 'Something occur try again later...'
                  }
                })
              );
          } else {
            dispatch(
              createKPIFailure({
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

export const createKPIRequest = () => {
  return {
    type: CREATE_KPI_REQUEST
  };
};

export const createKPISuccess = kpi => {
  return {
    type: CREATE_KPI_SUCCESS,
    payload: kpi
  };
};

export const createKPIFailure = errors => {
  return {
    type: CREATE_KPI_FAILURE,
    payload: errors
  };
};
