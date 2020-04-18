import React, { Component } from 'react';
import '../../assets/css/adminComponent.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/authentications/actions/logoutActions';
import AuthenticateUserFlashMessage from '../messages/AuthenticateUserFlashMessage';
import { UnauthorizedUserFlashMessage } from '../messages/UnauthorizedUserFlashMessage';
import EmployeesListComponent from './EmployeesListComponent';
import EmployeeDetailsComponent from './EmployeeDetailsComponent';
import CreateKPIComponent from './CreateKPIComponent';
import CreateKPIFlashMessagesList from '../messages/CreateKPIFlashMessagesList';
import KPIsListComponent from '../kpis-management/KPIsListComponent';
import ScoreboardsListComponent from './ScoreboardsListComponent';
import CreateScoreboardComponent from '../scoreboards-management/CreateScoreboardComponent';
import CreateScoreboardFlashMessage from '../messages/CreateScoreboardFlashMessage';
import AllScoreboardsComponent from '../scoreboards-management/AllScoreboardsComponent';
import EditScoreboardComponent from './EditScoreboardComponent';
import EditScoreboardFlashMessage from '../messages/EditScoreboardFlashMessage';
import EditScoresComponent from './EditScoresComponent';
import NoMatch404 from '../layouts/NoMatch404';
import MyDetailsComponent from './MyDetailsComponent';
import SettingsComponent from './SetttingsComponent';
import ScoreboardDetailsComponent from '../scoreboards-management/ScoreboardDetailsComponent';
import EditEmployeeComponent from './EditEmployeeComponent';
import SearchEmployeeComponent from '../employees/SearchEmployeeComponent';
import OneMonthDashboardComponent from './1MonthDashboardComponent';
import ThreeMonthsDashboardComponent from './3MonthsDashboardComponent';
import SixMonthsDashboardComponent from './6MonthsDashboardComponent';
import OneYearDashboardComponent from './1YearDashboardComponent';
import CreateScoreboardEmployeesList from './CreateScoreboardEmployeesList';
import ReportsListComponent from '../reports/ReportsListComponent';

export class ManagerComponent extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  };
  render() {
    const {
      isAuthenticated,
      authenticateUser
    } = this.props.authenticateUserData;

    return (
      <div id="admin-component">
        {/* <!-- Bootstrap NavBar --> */}
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          {/* Toggle button */}
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 3D Branding */}
          <NavLink
            activeClassName="active"
            className="navbar-brand"
            to="/manager"
          >
            3D Services
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <a
                  href="#!"
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                  onClick={this.logout}
                >
                  Logout{' '}
                  {isAuthenticated
                    ? authenticateUser.userInformation.email
                    : ''}
                </a>
              </li>

              {/* <!-- This menu is hidden in bigger devices with d-sm-none.  */}
              {/* The sidebar isn't proper for smaller screens imo, so this dropdown menu can keep all the useful sidebar itens exclusively for smaller screens  --> */}

              {/* Dashboard */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dashboards
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/1month"
                  >
                    This Months's Scoreboard
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/3months"
                  >
                    Last Three Months
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/6months"
                  >
                    Last Six Months
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/1year"
                  >
                    This Year
                  </NavLink>
                </div>
              </li>
              {/* Employees */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Employees
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/all-employees"
                  >
                    All Employees
                  </NavLink>
                </div>
              </li>
              {/* KPIs */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  KPIs
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/all-kpis"
                  >
                    All KPIs
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/create-kpi"
                  >
                    Create KPI
                  </NavLink>
                </div>
              </li>

              {/* SCOREBOARDS */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Scoreboards
                </a>
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/all-scoreboards"
                  >
                    Search Employee
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/manager/create-scoreboards"
                  >
                    Create Scoreboard
                  </NavLink>
                </div>
              </li>
              {/* <!-- Smaller devices menu END --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- NavBar END --> */}

        {/* <!-- Bootstrap row --> */}
        <div className="row" id="body-row">
          {/* <!-- Sidebar --> */}
          <div
            id="sidebar-container"
            className="sidebar-expanded d-none d-md-block"
          >
            {/* <!-- d-* hiddens the Sidebar in smaller devices. Its items can be kept on the Navbar 'Menu' --> */}
            {/* <!-- Bootstrap List Group --> */}
            <ul className="list-group">
              {/* <!-- Separator with title --> */}
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>MAIN MENU</small>
              </li>

              {/* PROFILE */}
              <a
                href="#submenu2"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-user fa-fw mr-3"></span>
                  <span className="menu-collapsed">Profile</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Submenu content --> */}
              <div id="submenu2" className="collapse sidebar-submenu">
                <NavLink
                  to="/manager/settings"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Settings</span>
                </NavLink>
                <NavLink
                  to="/manager/my-details"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">My Details</span>
                </NavLink>

                <NavLink
                  to={`/manager/all-scoreboards/${
                    isAuthenticated ? authenticateUser.userInformation.id : ''
                  }`}
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">My Scoreboards</span>
                </NavLink>
              </div>

              {/* DASHBOARD */}

              <a
                href="#submenu1"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Dashboards</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Submenu content --> */}
              <div id="submenu1" className="collapse sidebar-submenu">
                <NavLink
                  to="/manager/1month"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">
                    This Month's ScoreBoards
                  </span>
                </NavLink>
                <NavLink
                  to="/manager/3months"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Last Three Months</span>
                </NavLink>
                <NavLink
                  to="/manager/6months"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Last Six Months</span>
                </NavLink>
                <NavLink
                  to="/manager/1year"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">This Year</span>
                </NavLink>
              </div>

              {/* <!-- Separator with title --> */}
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>OPTIONS</small>
              </li>
              {/* <!-- /END Separator --> */}
              {/* <!-- Menu with submenu --> */}
              {/* Employees Menu */}
              <a
                href="#employees-submenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Employees</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Employees Submenu --> */}
              <div id="employees-submenu" className="collapse sidebar-submenu">
                <NavLink
                  to="/manager/all-employees"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All Employees</span>
                </NavLink>
              </div>
              {/* KPIs Menu */}
              <a
                href="#kpis-submenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">KPIs</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- KPIs Submenu --> */}
              <div id="kpis-submenu" className="collapse sidebar-submenu">
                <NavLink
                  to="/manager/all-kpis"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All KPIs</span>
                </NavLink>
                <NavLink
                  to="/manager/create-kpi"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create KPI</span>
                </NavLink>
              </div>
              {/* Scoreboards Menu */}
              <a
                href="#scoreboards-submenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Scoreboards</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Employees Submenu --> */}
              <div
                id="scoreboards-submenu"
                className="collapse sidebar-submenu"
              >
                <NavLink
                  to="/manager/all-scoreboards"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Search Employee</span>
                </NavLink>
                <NavLink
                  to="/manager/create-scoreboards"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create Scoreboards</span>
                </NavLink>
              </div>

              {/* <!-- Separator without title --> */}
              <li className="list-group-item sidebar-separator menu-collapsed"></li>
              {/* <!-- /END Separator --> */}
              <NavLink
                to="/manager/help"
                className="bg-dark list-group-item list-group-item-action"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-question fa-fw mr-3"></span>
                  <span className="menu-collapsed">Help</span>
                </div>
              </NavLink>
            </ul>
            {/* List Group END */}
          </div>
          {/* sidebar-container END */}

          {/* MAIN COLUMN, Insert all your dynamic data here */}
          <div className="col">
            <AuthenticateUserFlashMessage />
            <UnauthorizedUserFlashMessage />
            <CreateKPIFlashMessagesList />
            <CreateScoreboardFlashMessage />
            <EditScoreboardFlashMessage />
            <Switch>
              <Route
                exact
                path="/manager"
                component={OneMonthDashboardComponent}
              />
              <Route
                exact
                path={'/manager/all-employees'}
                component={EmployeesListComponent}
              />

              <Route path={'/manager/all-kpis'} component={KPIsListComponent} />
              <Route
                path={'/manager/all-employees/:id'}
                component={EmployeeDetailsComponent}
              />

              <Route
                path={`${this.props.match.url}/all-employees/:id`}
                component={EmployeeDetailsComponent}
              />

              <Route
                path="/manager/create-kpi"
                component={CreateKPIComponent}
              />

              <Route
                path={'/manager/all-scoreboards/:id'}
                component={ScoreboardsListComponent}
              />
              <Route
                path={'/manager/all-scoreboards'}
                component={AllScoreboardsComponent}
              />

              <Route
                path={'/manager/create-scoreboard'}
                component={CreateScoreboardComponent}
              />

              <Route
                path={'/manager/scoreboardlayout/:id'}
                component={ScoreboardDetailsComponent}
              />

              {/* Information Regarding me */}
              <Route
                path={'/manager/my-details'}
                component={MyDetailsComponent}
              />

              <Route
                path={'/manager/search-employee'}
                component={SearchEmployeeComponent}
              />

              <Route path={'/manager/settings'} component={SettingsComponent} />

              <Route
                path={'/manager/all-scoreboards/:id'}
                component={ScoreboardsListComponent}
              />

              <Route
                path={'/manager/edit-scoreboard/:id'}
                component={EditScoreboardComponent}
              />

              <Route
                path={'/manager/edit-employee/:id'}
                component={EditEmployeeComponent}
              />
              <Route
                path={'/manager/edit-scores/:id'}
                component={EditScoresComponent}
              />

              <Route
                path={'/manager/1month'}
                component={OneMonthDashboardComponent}
              />

              <Route
                path={'/manager/3months'}
                component={ThreeMonthsDashboardComponent}
              />

              <Route
                path={'/manager/6months'}
                component={SixMonthsDashboardComponent}
              />

              <Route
                path={'/manager/create-scoreboards'}
                component={CreateScoreboardEmployeesList}
              />

              <Route
                path={'/manager/1year'}
                component={OneYearDashboardComponent}
              />

              {/* Show all the reports created for the scoreboard */}
              <Route
                path={'/manager/reports/:id'}
                component={ReportsListComponent}
              />

              <Route component={NoMatch404} />
            </Switch>
          </div>
          {/* Main Col END  */}
        </div>
        {/* body-row END */}
      </div>
    );
  }
}

export default connect(
  state => {
    return { authenticateUserData: state.authenticateUserReducer };
  },
  { logout }
)(ManagerComponent);
