import React, { Component } from 'react';
import '../../assets/css/404.css';

export class NoMatch404 extends Component {
  render() {
    return (
      <div className="container body mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div className="error-details">
                Sorry, an error has occured, Requested page not found!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoMatch404;
