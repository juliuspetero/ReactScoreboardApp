import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE
} from '../actionsTypes/fetchReportsActionTypes';

const initialState = {
  isLoading: false,
  reports: [],
  error: null
};

const fetchReportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_REPORTS_SUCCESS:
      return {
        isLoading: false,
        reports: action.payload,
        error: ''
      };
    case FETCH_REPORTS_FAILURE:
      return {
        isLoading: false,
        reports: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchReportsReducer;
