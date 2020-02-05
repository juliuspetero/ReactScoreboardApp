import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateKPIFlashMessage from './';
import { deleteCreateKPIFlashMessage } from '../../redux/flashMessages/actions/createKPIFlashMessagesActions';

export class CreateKPIFlashMessagesList extends Component {
  render() {
    const messages = this.props.createKPIFlashMessages.map(message => (
      <CreateKPIFlashMessage
        key={message.id}
        message={message}
        deleteCreateKPIFlashMessage={this.props.deleteCreateKPIFlashMessage}
      ></CreateKPIFlashMessage>
    ));
    return <div>{messages}</div>;
  }
}

export default connect(
  state => {
    return { createKPIFlashMessages: state.createKPIFlashMessagesReducer };
  },
  { deleteCreateKPIFlashMessage }
)(CreateKPIFlashMessagesList);
