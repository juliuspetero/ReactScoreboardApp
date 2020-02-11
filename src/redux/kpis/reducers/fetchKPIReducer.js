import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../actionsTypes/fetchUserActionTypes';

const initialState = {
  isLoading: false,
  kpi: null,
  error: null
};

const fetchKPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        isLoading: false,
        kpi: action.payload,
        error: null
      };
    case FETCH_USER_FAILURE:
      return {
        isLoading: false,
        kpi: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchKPIReducer;
