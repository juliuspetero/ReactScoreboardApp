import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUnauthorizedUserFlashMessage } from '../../redux/flashMessages/actions/unauthorizedUserFlashMessagesActions';

const lineManagerId = '3by786gk6s03iu3';

export default function(ComposedCompponent) {
  class AuthenticateComponent extends Component {
    componentDidMount() {
      if (!this.props.authenticateUserData.isAuthenticated) {
        // Non-authenticated user are allowed to access
        this.props.addUnauthorizedUserFlashMessage(
          'You need to login to access this resource'
        );
        this.props.history.push('/login');
      } else {
        if (
          this.props.authenticateUserData.authenticateUser.userInformation
            .roles[0].id !== lineManagerId
        ) {
          // Non-admin members are not allow to access the resource
          this.props.addUnauthorizedUserFlashMessage(
            'You need to login as Administrator to access this resource'
          );
          this.props.history.push('/login');
        }
      }
    }

    componentWillUpdate(nextProps) {
      if (!this.props.authenticateUserData.isAuthenticated) {
        // Non-authenticated user are allowed to access
        this.props.addUnauthorizedUserFlashMessage(
          'You need to login to access this resource'
        );
        this.props.history.push('/login');
      } else {
        if (
          this.props.authenticateUserData.authenticateUser.userInformation
            .roles[0].id !== lineManagerId
        ) {
          // Non-admin members are not allow to access the resource
          this.props.addUnauthorizedUserFlashMessage(
            'You need to login as Administrator to access this resource'
          );
          this.props.history.push('/login');
        }
      }
    }

    render() {
      return <ComposedCompponent {...this.props} />;
    }
  }

  return connect(
    state => {
      return {
        authenticateUserData: state.authenticateUserReducer
      };
    },
    { addUnauthorizedUserFlashMessage }
  )(AuthenticateComponent);
}
