import uniqid from 'uniqid';
import {
  ADD_SELECT_KPI,
  DELETE_SELECT_KPI
} from '../actionsTypes/selectKPIActionTypes';

const initialState = [];

const addSelectKPIReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_SELECT_KPI:
      return [...state, uniqid()];

    case DELETE_SELECT_KPI:
      state = state.filter(s => action.id !== s);
      return state;
    default:
      return [...state];
  }
};

export default addSelectKPIReducer;
