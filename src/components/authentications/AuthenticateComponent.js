import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUnauthorizedUserFlashMessage } from '../../redux/flashMessages/actions/unauthorizedUserFlashMessagesActions';

export default function(ComposedCompponent) {
  class AuthenticateComponent extends Component {
    componentDidMount() {
      if (!this.props.authenticateUserData.isAuthenticated) {
        // The user is not allow to access the resource
        this.props.addUnauthorizedUserFlashMessage(
          'You need to login to access this resource'
        );

        console.log(this.props.authenticateUserData.isAuthenticated);

        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticateUserData.isAuthenticated)
        this.props.history.push('/login');
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
