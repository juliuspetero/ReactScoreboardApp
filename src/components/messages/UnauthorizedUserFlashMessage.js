import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUnauthorizedUserFlashMessage } from '../../redux/flashMessages/actions/unauthorizedUserFlashMessagesActions';
// import store from '../../redux/store';

export class UnauthorizedUserFlashMessage extends Component {
  onClick = () => {
    this.props.deleteUnauthorizedUserFlashMessage();
  };

  //   componentWillUnmount() {
  //     store.dispatch(deleteUnauthorizedUserFlashMessage());
  //   }

  render() {
    const message = this.props.unauthorizedUserUserFlashMessages;
    if (!message) return <div />;
    return (
      <div>
        <div className="alert alert-danger my-3 mx-5">
          <button onClick={this.onClick} className="close">
            <span>&times;</span>
          </button>
          <div>{message}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      unauthorizedUserUserFlashMessages:
        state.unauthorizedUserFlashMessagesReducer
    };
  },
  { deleteUnauthorizedUserFlashMessage }
)(UnauthorizedUserFlashMessage);
