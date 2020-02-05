import uniqid from 'uniqid';
import findIndex from 'lodash/findIndex';
import {
  ADD_CREATE_KPI_FLASH_MESSAGE,
  DELETE_CREATE_KPI_FLASH_MESSAGE
} from '../actionTypes/createKPIFlashMessagesActionTypes';

const initialState = [];

const createKPIFlashMessagesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_CREATE_KPI_FLASH_MESSAGE:
      return [...state, { id: uniqid(), messageData: action.message }];

    case DELETE_CREATE_KPI_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return [...state];
    // return [];
    default:
      return [...state];
  }
};

export default createKPIFlashMessagesReducer;
