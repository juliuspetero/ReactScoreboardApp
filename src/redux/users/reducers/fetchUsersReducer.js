import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_FETCH_SEARCH_EMPLOYEES_FAILURE,
  FETCH_FETCH_SEARCH_EMPLOYEES_SUCCESS,
  FETCH_FETCH_SEARCH_EMPLOYEES_REQUEST
} from '../actionsTypes/fetchUsersActionTypes';

const initialState = {
  isLoading: false,
  users: [],
  error: null
};

const fetchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        isLoading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_USERS_FAILURE:
      return {
        isLoading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const initialSearchEmployeesState = {
  isLoading: false,
  searchEmployees: [],
  errors: null
};

export const fetchSearchEmployeesReducer = (
  state = initialSearchEmployeesState,
  action
) => {
  switch (action.type) {
    case FETCH_FETCH_SEARCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_FETCH_SEARCH_EMPLOYEES_SUCCESS:
      return {
        isLoading: false,
        searchEmployees: action.payload,
        errors: ''
      };
    case FETCH_FETCH_SEARCH_EMPLOYEES_FAILURE:
      return {
        isLoading: false,
        searchEmployees: [],
        errors: action.payload
      };
    default:
      return state;
  }
};

export default fetchUsersReducer;
