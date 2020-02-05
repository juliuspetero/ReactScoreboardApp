import {
  FETCH_ROLES_REQUEST,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE
} from '../actionsTypes/fetchRolesActionTypes';

const initialState = {
  isLoading: false,
  roles: [],
  error: null
};

const fetchRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ROLES_SUCCESS:
      return {
        isLoading: false,
        roles: action.payload,
        error: ''
      };
    case FETCH_ROLES_FAILURE:
      return {
        isLoading: false,
        roles: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchRolesReducer;
