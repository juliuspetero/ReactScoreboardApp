import {
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAILURE
} from '../actionsTypes/createReportActionTypes';

import { DELETE_CREATE_REPORT_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
const initialState = {
  isLoading: false,
  createReport: null,
  errors: null
};

const createReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_REPORT_SUCCESS:
      return {
        isLoading: false,
        createReport: action.payload,
        errors: null
      };
    case CREATE_REPORT_FAILURE:
      return {
        isLoading: false,
        createReport: null,
        errors: action.payload
      };

    case DELETE_CREATE_REPORT_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default createReportReducer;
