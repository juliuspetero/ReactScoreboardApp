import {
  EDIT_REPORT_FAILURE,
  EDIT_REPORT_SUCCESS,
  EDIT_REPORT_REQUEST
} from '../actionsTypes/editReportActionTypes';

import { DELETE_EDIT_REPORT_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
const initialState = {
  isLoading: false,
  editReport: null,
  errors: null
};

const editReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_REPORT_SUCCESS:
      return {
        isLoading: false,
        editReport: action.payload,
        errors: null
      };
    case EDIT_REPORT_FAILURE:
      return {
        isLoading: false,
        editReport: null,
        errors: action.payload
      };

    case DELETE_EDIT_REPORT_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default editReportReducer;
