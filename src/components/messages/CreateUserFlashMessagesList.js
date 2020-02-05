import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateUserFlashMessage from './CreateUserFlashMessage';
import { deleteCreateUserFlashMessage } from '../../redux/flashMessages/actions/createUserflashMessagesActions';

export class CreateUserFlashMessagesList extends Component {
  render() {
    const messages = this.props.createUserFlashMessages.map(message => (
      <CreateUserFlashMessage
        key={message.id}
        message={message}
        deleteCreateUserFlashMessage={this.props.deleteCreateUserFlashMessage}
      ></CreateUserFlashMessage>
    ));
    return <div>{messages}</div>;
  }
}

export default connect(
  state => {
    return { createUserFlashMessages: state.createUserflashMessagesReducer };
  },
  { deleteCreateUserFlashMessage }
)(CreateUserFlashMessagesList);
