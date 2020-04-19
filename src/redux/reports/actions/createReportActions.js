import axios from 'axios';
import config from '../../../config/config';
import validateInput from '../../../helpers/validateCreateReport';

import {
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAILURE,
} from '../actionsTypes/createReportActionTypes';
import cloneDeep from 'lodash/cloneDeep';

// Action creators returns the action object
export const createReport = (report) => {
  return (dispatch) => {
    dispatch(createReportRequest());
    // Write client side validation here
    const { errors, isValid } = validateInput(cloneDeep(report));
    if (!isValid) dispatch(createReportFailure({ data: errors }));
    else {
      const formdata = new FormData();
      formdata.append('reportDocument', report.reportDocument);
      formdata.append('description', report.description);
      formdata.append('scoreBoardId', report.scoreBoardId);
      axios
        .post(`${config.baseUrl}/reports`, formdata)
        .then((response) => {
          // console.log(response.data);
          dispatch(createReportSuccess(response.data));
        })
        .catch((error) => {
          if (error.response) dispatch(createReportFailure(error.response));
          else
            dispatch(
              createReportFailure({
                data: {
                  message: 'Something occur try again later...',
                },
              })
            );
        });
    }
  };
};

export const createReportRequest = () => {
  return {
    type: CREATE_REPORT_REQUEST,
  };
};

export const createReportSuccess = (user) => {
  return {
    type: CREATE_REPORT_SUCCESS,
    payload: user,
  };
};

export const createReportFailure = (errors) => {
  return {
    type: CREATE_REPORT_FAILURE,
    payload: errors,
  };
};
