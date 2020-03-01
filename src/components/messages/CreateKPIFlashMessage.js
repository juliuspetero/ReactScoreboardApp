import React, { Component } from 'react';

export class CreateKPIFlashMessage extends Component {
  onClick = () => this.props.deleteCreateKPIFlashMessage(this.props.message.id);

  render() {
    const { messageData } = this.props.message;
    if (!messageData) return <div />;

    return (
      <div>
        <div className="alert alert-success my-3 mx-5">
          <button onClick={this.onClick} className="close">
            <span>&times;</span>
          </button>
          <h3>
            {messageData.title && messageData.description
              ? `You have successfully created KPI with Title ${messageData.title}`
              : messageData.title && !messageData.description
              ? 'Job title successfully created'
              : 'You have successfully updated the KPI'}
          </h3>
        </div>
      </div>
    );
  }
}

export default CreateKPIFlashMessage;
