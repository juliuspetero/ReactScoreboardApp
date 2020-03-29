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
import fetchKPIsReducer from './kpis/reducers/fetchKPIsReducer';
import fetchScoreboardsReducer from './scoreboards/reducers/fetchScoreboardsReducer';
import createScoreboardReducer from './scoreboards/reducers/createScoreboardReducer';
import addSelectKPIReducer from './kpis/reducers/addSelectKPIReducer';
import { fetchSearchEmployeesReducer } from './users/reducers/fetchUsersReducer';
import createScoreboardFlashMessagesReducer from './flashMessages/reducers/createScoreboardFlashMessagesReducer';
import editScoreboardFlashMessagesReducer from './flashMessages/reducers/editScoreboardFlashMessageReducer';
import editScoreboardReducer from './scoreboards/reducers/editScoreboardReducer';
import editScoresReducer from './scoreboards/reducers/editScoresReducer';
import fetchKPIReducer from './kpis/reducers/fetchKPIReducer';
import editKPIReducer from './kpis/reducers/editKPIReducer';
import fetchJobtitlesReducer from './jobtitles/reducers/fetchJobtitlesReducer';
import createJobtitleReducer from './jobtitles/reducers/createJobtitleReducer';
import editJobtitleReducer from './jobtitles/reducers/editJobtitleReducer';
import fetchJobtitleReducer from './jobtitles/reducers/fetchJobtitleReducer';
import fetchDepartmentsReducer from './departments/reducers/fetchDepartmentsReducer';
import createDepartmentReducer from './departments/reducers/createDepartmentReducer';
import editDepartmentReducer from './departments/reducers/editDepartmentReducer';
import fetchDepartmentReducer from './departments/reducers/fetchDepartmentReducer';
import editEmployeeReducer from './users/reducers/editUserReducer';
import createReportReducer from './reports/reducers/createReportReducer';
import editReportReducer from './reports/reducers/editReportReducer';
import fetchReportsReducer from './reports/reducers/fetchReportsReducer';
import fetchReportReducer from './reports/reducers/fetchReportReducer';

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
  fetchKPIsReducer,
  fetchScoreboardsReducer,
  createScoreboardReducer,
  addSelectKPIReducer,
  fetchSearchEmployeesReducer,
  createScoreboardFlashMessagesReducer,
  editScoreboardFlashMessagesReducer,
  editScoreboardReducer,
  editScoresReducer,
  fetchKPIReducer,
  editKPIReducer,
  fetchJobtitlesReducer,
  createJobtitleReducer,
  editJobtitleReducer,
  fetchJobtitleReducer,
  fetchDepartmentsReducer,
  createDepartmentReducer,
  editDepartmentReducer,
  fetchDepartmentReducer,
  editEmployeeReducer,
  createReportReducer,
  editReportReducer,
  fetchReportsReducer,
  fetchReportReducer
});

export default rootReducer;
