import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE
} from '../actionsTypes/fetchReportActionTypes';

const initialState = {
  isLoading: false,
  reports: [],
  error: null
};

const fetchReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_REPORT_SUCCESS:
      return {
        isLoading: false,
        report: action.payload,
        error: ''
      };
    case FETCH_REPORT_FAILURE:
      return {
        isLoading: false,
        report: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchReportReducer;
