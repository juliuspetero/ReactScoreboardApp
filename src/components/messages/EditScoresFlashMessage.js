import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteEditScoresFlashMessage } from '../../redux/flashMessages/actions/editScoresFlashMessagesActions';

export class EditScoresFlashMessage extends Component {
  render() {
    const message = this.props.editScoresFlashMessages;
    if (!message) return <div />;
    return (
      <div>
        <div className="alert alert-success my-3 mx-5">
          <button
            onClick={() => this.props.deleteEditScoresFlashMessage()}
            className="close"
          >
            <span>&times;</span>
          </button>
          <div>
            The scores for {message.user.username} has been successfully edited
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      editScoresFlashMessages: state.editScoresFlashMessagesReducer
    };
  },
  { deleteEditScoresFlashMessage }
)(EditScoresFlashMessage);
