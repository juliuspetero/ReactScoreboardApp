import React, { Component } from 'react';

export class ErrorMessage extends Component {
  onDeleteErrorMessage = () =>
    this.props.deleteEditScoresErrorMessage(this.props.messageKey);

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

export default ErrorMessage;
