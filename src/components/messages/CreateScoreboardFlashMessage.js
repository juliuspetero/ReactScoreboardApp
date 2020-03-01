import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCreateScoreboardFlashMessage } from '../../redux/flashMessages/actions/createScoreboardFlashMessagesAction';

export class CreateScoreboardFlashMessage extends Component {
  render() {
    const message = this.props.createScoreboardFlashMessages;
    if (!message) return <div />;
    return (
      <div>
        <div className="alert alert-success my-3 mx-5">
          <button
            onClick={() => this.props.deleteCreateScoreboardFlashMessage()}
            className="close"
          >
            <span>&times;</span>
          </button>
          <div>The scoreboards have been successfully created</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      createScoreboardFlashMessages: state.createScoreboardFlashMessagesReducer
    };
  },
  { deleteCreateScoreboardFlashMessage }
)(CreateScoreboardFlashMessage);
