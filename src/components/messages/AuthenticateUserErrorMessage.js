import React, { Component } from 'react';

export class AuthenticateUserErrorMessage extends Component {
  onDeleteErrorMessage = () =>
    this.props.deleteAuthenticateUserErrorMessage(this.props.messageKey);

  render() {
    return (
      <div className="alert alert-danger alert-dismissible">
        <button onClick={this.onDeleteErrorMessage} className="close">
          <span>&times;</span>
        </button>
        {this.props.messageValue}
      </div>
    );
  }
}

export default AuthenticateUserErrorMessage;
