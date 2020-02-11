import React, { Component } from 'react';
import '../../assets/css/adminComponent.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/authentications/actions/logoutActions';
import AuthenticateUserFlashMessage from '../messages/AuthenticateUserFlashMessage';
import EmployeeDashboardComponent from './EmployeeDashboardComponent';
import { UnauthorizedUserFlashMessage } from '../messages/UnauthorizedUserFlashMessage';
import EmployeeDetailsComponent from '../employees-management/EmployeeDetailsComponent';

export class EmployeeComponent extends Component {
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
                  Scoreboard
                </a>
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <a
                    className="dropdown-item bg-dark text-white"
                    href="/employees/all-scoreboards"
                  >
                    All Scoreboards
                  </a>
                  <a
                    className="dropdown-item bg-dark text-white"
                    href="/employees/edit-scoreboard"
                  >
                    Edit Unapproved Scoreboards
                  </a>
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
                <a
                  href="#!"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All Scoreboards</span>
                </a>
                <a
                  href="#!"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Edit Scoreboard</span>
                </a>
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

            <Route
              exact
              path="/employee"
              component={EmployeeDashboardComponent}
            />
            <Switch>
              <Route
                path={'/employee/profile/'}
                component={EmployeeDetailsComponent}
              />
              <Route
                path={'/employee/all-scoreboards'}
                component={EmployeeDetailsComponent}
              />
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
)(EmployeeComponent);
