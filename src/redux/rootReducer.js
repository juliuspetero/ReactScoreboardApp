import { combineReducers } from 'redux';
import fetchUsersReducer from './users/reducers/fetchUsersReducer';
import fetchUserReducer from './users/reducers/fetchUserReducer';
import createUserReducer from './users/reducers/createUserReducer';
import deleteUserReducer from './users/reducers/deleteUserReducer';
import editUserReducer from './users/reducers/editUserReducer';
import authenticateUserReducer from './authentications/reducers/authenticateUserReducer';
import createUserflashMessagesReducer from './flashMessages/reducers/createUserflashMessagesReducer';
import authenticateUserFlashMessagesReducer from './flashMessages/reducers/authenticateUserFlashMessagesReducer';
import unauthorizedUserFlashMessagesReducer from './flashMessages/reducers/unauthorizedUserFlashMessagesReducer';
import fetchRolesReducer from './roles/reducers/fetchRolesReducer';
import createKPIReducer from './kpis/reducers/createKPIReducer';
import createKPIFlashMessagesReducer from './flashMessages/reducers/createKPIFlashMessagesReducer';
import fetchDepartmentsReducer from './departments/reducers/fetchDepartmentsReducer';
import fetchKPIsReducer from './kpis/reducers/fetchKPIsReducer';

// Give appropriate names for the state
const rootReducer = combineReducers({
  fetchUsersReducer,
  fetchUserReducer,
  editUserReducer,
  deleteUserReducer,
  createUserReducer,
  authenticateUserReducer,
  createUserflashMessagesReducer,
  authenticateUserFlashMessagesReducer,
  unauthorizedUserFlashMessagesReducer,
  fetchRolesReducer,
  createKPIReducer,
  createKPIFlashMessagesReducer,
  fetchDepartmentsReducer,
  fetchKPIsReducer
});

export default rootReducer;
