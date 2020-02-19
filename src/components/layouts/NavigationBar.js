import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/authentications/actions/logoutActions';

export class NavigationBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink activeClassName="active" className="navbar-brand" to="/">
          3D Services
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(
  connect(
    state => {
      return { authenticateUserData: state.authenticateUserReducer };
    },
    { logout }
  )(NavigationBar)
);
