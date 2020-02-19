import {
  ADD_SELECT_KPI,
  DELETE_SELECT_KPI
} from '../actionsTypes/selectKPIActionTypes';

export const addSelectKPI = () => {
  return dispatch => {
    dispatch({ type: ADD_SELECT_KPI });
  };
};

export const deleteSelectKPI = id => {
  return dispatch => {
    dispatch({ type: DELETE_SELECT_KPI, id });
  };
};
