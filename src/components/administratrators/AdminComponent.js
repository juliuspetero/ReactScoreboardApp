import React, { Component } from 'react';
import '../../assets/css/adminComponent.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/authentications/actions/logoutActions';
import AuthenticateUserFlashMessage from '../messages/AuthenticateUserFlashMessage';
import AdminDashboard from './AdminDashboard';
import { UnauthorizedUserFlashMessage } from '../messages/UnauthorizedUserFlashMessage';
import EmployeesListComponent from '../employees-management/EmployeesListComponent';
import EmployeeDetailsComponent from '../employees-management/EmployeeDetailsComponent';
import CreateEmployeeComponent from '../employees-management/CreateEmployeeComponent';
import CreateUserFlashMessagesList from '../messages/CreateUserFlashMessagesList';
import CreateKPIComponent from '../kpis-management/CreateKPIComponent';
import CreateKPIFlashMessagesList from '../messages/CreateKPIFlashMessagesList';
import KPIsListComponent from '../kpis-management/KPIsListComponent';
import ScoreboardsListComponent from '../scoreboards-management/ScoreboardsListComponent';
import CreateScoreboardComponent from '../scoreboards-management/CreateScoreboardComponent';
import CreateScoreboardFlashMessage from '../messages/CreateScoreboardFlashMessage';
import AllScoreboardsComponent from '../scoreboards-management/AllScoreboardsComponent';
import EditScoreboardComponent from '../scoreboards-management/EditScoreboardComponent';
import EditScoreboardFlashMessage from '../messages/EditScoreboardFlashMessage';
import EditScoresComponent from '../scoreboards-management/EditScoresComponent';
import NoMatch404 from '../layouts/NoMatch404';

export class AdminComponent extends Component {
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
          <NavLink activeClassName="active" className="navbar-brand" to="/">
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
                  <NavLink className="dropdown-item bg-dark text-white" to="#!">
                    Dashboard 1
                  </NavLink>
                  <NavLink className="dropdown-item bg-dark text-white" to="#!">
                    Dashboard 2
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
                    to="/admin/all-kpis"
                  >
                    All KPIs
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/create-employee"
                  >
                    Create KPI
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
                    to="/admin/all-employees"
                  >
                    All Employees
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/create-employee"
                  >
                    Create Employee
                  </NavLink>
                </div>
              </li>

              {/* Scoreboard */}
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
                    to="/admin/all-scoreboards"
                  >
                    All Scoreboards
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/create-employee"
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
              {/* <!-- /END Separator --> */}
              {/* <!-- Menu with submenu --> */}
              <a
                href="#submenu1"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Dashboard</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Submenu content --> */}
              <div id="submenu1" className="collapse sidebar-submenu">
                <a
                  href="#!"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Score Boards</span>
                </a>
                <a
                  href="#!"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Charts</span>
                </a>
                <a
                  href="#!"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Reports</span>
                </a>
              </div>
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
                <a
                  href="#!"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Settings</span>
                </a>
                <a
                  href="#!"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Password</span>
                </a>
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
                  to="/admin/all-employees"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All Employees</span>
                </NavLink>
                <NavLink
                  to="/admin/create-employee"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create Employee</span>
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
                  to="/admin/all-kpis"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All KPIs</span>
                </NavLink>
                <NavLink
                  to="/admin/create-kpi"
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
                  <span className="menu-collapsed">Score Boards</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Employees Submenu --> */}
              <div
                id="scoreboards-submenu"
                className="collapse sidebar-submenu"
              >
                <NavLink
                  to="/admin/all-scoreboards"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All Scoreboards</span>
                </NavLink>
                <NavLink
                  to="/admin/create-scoreboard"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create Scoreboard</span>
                </NavLink>
              </div>

              {/* <!-- Separator without title --> */}
              <li className="list-group-item sidebar-separator menu-collapsed"></li>
              {/* <!-- /END Separator --> */}
              <a
                href="#!"
                className="bg-dark list-group-item list-group-item-action"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-question fa-fw mr-3"></span>
                  <span className="menu-collapsed">Help</span>
                </div>
              </a>
            </ul>
            {/* List Group END */}
          </div>
          {/* sidebar-container END */}

          {/* MAIN COLUMN, Insert all your dynamic data here */}
          <div className="col">
            <AuthenticateUserFlashMessage />
            <UnauthorizedUserFlashMessage />
            <CreateUserFlashMessagesList />
            <CreateKPIFlashMessagesList />
            <CreateScoreboardFlashMessage />
            <EditScoreboardFlashMessage />
            <Switch>
              <Route exact path="/admin" component={AdminDashboard} />
              <Route
                exact
                path={'/admin/all-employees'}
                component={EmployeesListComponent}
              />

              <Route
                path={'/admin/create-employee'}
                component={CreateEmployeeComponent}
              />
              <Route path={'/admin/all-kpis'} component={KPIsListComponent} />
              <Route
                path={'/admin/all-employees/:id'}
                component={EmployeeDetailsComponent}
              />

              <Route
                path={`${this.props.match.url}/all-employees/:id`}
                component={EmployeeDetailsComponent}
              />

              <Route path="/admin/create-kpi" component={CreateKPIComponent} />

              <Route
                path={'/admin/all-scoreboards/:id'}
                component={ScoreboardsListComponent}
              />
              <Route
                path={'/admin/all-scoreboards'}
                component={AllScoreboardsComponent}
              />

              <Route
                path={'/admin/create-scoreboard'}
                component={CreateScoreboardComponent}
              />

              <Route
                path={'/admin/edit-scoreboard/:id'}
                component={EditScoreboardComponent}
              />
              <Route
                path={'/admin/edit-scores/:id'}
                component={EditScoresComponent}
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
)(AdminComponent);
