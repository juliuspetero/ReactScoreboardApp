import axios from 'axios';
import isObject from 'lodash/isObject';
import config from '../../../config/config';
import validateEditJobtitle from '../../../helpers/validateEditJobtitle';

import {
  CREATE_KPI_REQUEST,
  CREATE_KPI_SUCCESS,
  CREATE_KPI_FAILURE
} from '../../kpis/actionsTypes/createKPIActionTypes';

// Action creators returns the action object
export const editJobtitle = body => {
  // console.log(body);
  return dispatch => {
    dispatch(createKPIRequest());
    // Write client side validation here
    const { errors, isValid } = validateEditJobtitle(body);
    // console.log(kpi);
    // return;
    if (!isValid) dispatch(createKPIFailure({ data: errors }));
    else {
      // Prepare the request body for API call
      const scoreboardLayoutId = body.scoreboardLayoutId;
      const jobtitle = body.jobtitle;
      let kpis = [];

      body.KPIIds.forEach((KPIId, index) => {
        kpis.push({
          id: KPIId,
          weight: body.KPIWeights[index]
        });
      });

      axios
        .put(`${config.baseUrl}/scoreboardlayouts/edit-kpi-weights`, {
          jobtitle,
          scoreboardLayoutId,
          kpis
        })
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
