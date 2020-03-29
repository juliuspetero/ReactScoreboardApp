import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import config from '../../../config/config';
import validateEditReport from '../../../helpers/validateEditReport';

import {
  EDIT_REPORT_FAILURE,
  EDIT_REPORT_SUCCESS,
  EDIT_REPORT_REQUEST
} from '../actionsTypes/editReportActionTypes';

// Action creators returns the action object
export const editReport = (id, report) => {
  console.log(report);
  return dispatch => {
    dispatch(editReportRequest());
    // Write client side validation here
    const { errors, isValid } = validateEditReport(cloneDeep(report));

    if (!isValid) dispatch(editReportFailure({ data: errors }));
    else {
      const formdata = new FormData();
      formdata.append('reportDocument', report.reportDocument);
      formdata.append('description', report.description);
      formdata.append('scoreBoardId', report.scoreBoardId);
      axios
        .put(`${config.baseUrl}/reports/${id}`, formdata)
        .then(response => {
          // console.log(response);
          if (response.data) dispatch(editReportSuccess(response.data));
          else
            dispatch(
              editReportFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
        })
        .catch(error => {
          if (error.response) {
            if (isObject(error.response.data))
              dispatch(editReportFailure(error.response));
            else
              dispatch(
                editReportFailure({
                  data: {
                    message: 'Something occur try again later...'
                  }
                })
              );
          } else {
            dispatch(
              editReportFailure({
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

export const editReportRequest = () => {
  return {
    type: EDIT_REPORT_REQUEST
  };
};

export const editReportSuccess = report => {
  return {
    type: EDIT_REPORT_SUCCESS,
    payload: report
  };
};

export const editReportFailure = errors => {
  return {
    type: EDIT_REPORT_FAILURE,
    payload: errors
  };
};
