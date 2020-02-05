import {
  CREATE_KPI_REQUEST,
  CREATE_KPI_SUCCESS,
  CREATE_KPI_FAILURE
} from '../actionsTypes/createKPIActionTypes';

import { DELETE_CREATE_KPI_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
const initialState = {
  isLoading: false,
  createKPI: null,
  errors: null
};

const createKPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_KPI_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_KPI_SUCCESS:
      return {
        isLoading: false,
        createKPI: action.payload,
        errors: null
      };
    case CREATE_KPI_FAILURE:
      return {
        isLoading: false,
        createKPI: null,
        errors: action.payload
      };

    case DELETE_CREATE_KPI_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default createKPIReducer;
