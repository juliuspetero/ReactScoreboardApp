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
            You have successfully created KPI with Title {messageData.title}
          </h3>
        </div>
      </div>
    );
  }
}

export default CreateKPIFlashMessage;
