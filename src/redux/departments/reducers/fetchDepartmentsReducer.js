import {
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAILURE
} from '../actionsTypes/fetchDepartmentsActionTypes';

const initialState = {
  isLoading: false,
  departments: [],
  error: null
};

const fetchDepartmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_DEPARTMENTS_SUCCESS:
      return {
        isLoading: false,
        departments: action.payload,
        error: ''
      };
    case FETCH_DEPARTMENTS_FAILURE:
      return {
        isLoading: false,
        departments: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchDepartmentsReducer;
