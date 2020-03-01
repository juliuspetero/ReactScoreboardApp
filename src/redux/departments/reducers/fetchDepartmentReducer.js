import {
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAILURE
} from '../actionsTypes/fetchDepartmentsActionTypes';

const initialState = {
  isLoading: false,
  department: null,
  error: null
};

const fetchDepartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_DEPARTMENTS_SUCCESS:
      return {
        isLoading: false,
        department: action.payload,
        error: ''
      };
    case FETCH_DEPARTMENTS_FAILURE:
      return {
        isLoading: false,
        department: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchDepartmentReducer;
