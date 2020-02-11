import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAuthenticateUserFlashMessage } from '../../redux/flashMessages/actions/authenticateUserFlashMessagesActions';

export class AuthenticateFlashMessage extends Component {
  onClick = () => {
    this.props.deleteAuthenticateUserFlashMessage();
  };
  render() {
    const user = this.props.authenticateUserFlashMessages;
    if (!user) return <div />;
    return (
      <div>
        <div className="alert alert-success my-3 mx-5">
          <button onClick={this.onClick} className="close">
            <span>&times;</span>
          </button>
          <p className="h3">Welcome {user.username}!</p>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      authenticateUserFlashMessages: state.authenticateUserFlashMessagesReducer
    };
  },
  { deleteAuthenticateUserFlashMessage }
)(AuthenticateFlashMessage);
