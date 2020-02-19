import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteEditScoreboardFlashMessage } from '../../redux/flashMessages/actions/editScoreboardFlashMessagesActions';

export class EditScoreboardFlashMessage extends Component {
  render() {
    const message = this.props.editScoreboardFlashMessages;
    if (!message) return <div />;
    return (
      <div>
        <div className="alert alert-success my-3 mx-5">
          <button
            onClick={() => this.props.deleteEditScoreboardFlashMessage()}
            className="close"
          >
            <span>&times;</span>
          </button>
          <div>
            The scoreboard for {message.user.username} has been successfully
            edited
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      editScoreboardFlashMessages: state.editScoreboardFlashMessagesReducer
    };
  },
  { deleteEditScoreboardFlashMessage }
)(EditScoreboardFlashMessage);
