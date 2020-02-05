import React, { Component } from 'react';

export class CreateUserFlashMessage extends Component {
  onClick = () =>
    this.props.deleteCreateUserFlashMessage(this.props.message.id);

  render() {
    const { messageData } = this.props.message;
    if (!messageData) return <div />;

    return (
      <div>
        <div className="alert alert-success my-3 mx-5">
          <button onClick={this.onClick} className="close">
            <span>&times;</span>
          </button>
          {messageData.message}
          <p>Password = {messageData.password}</p>
        </div>
      </div>
    );
  }
}

export default CreateUserFlashMessage;
