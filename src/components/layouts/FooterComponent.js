import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/layouts.css';

export class FooterComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="page-footer font-small pt-4 bg-secondary">
          <div className="container text-center text-md-left">
            <div className="row text-center text-md-left mt-3 pb-3">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  3D Services Limited
                </h6>
                <p>You name, we track it</p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Products
                </h6>
                <p>
                  <Link to="#!">Oliwa Tracker</Link>
                </p>
                <p>
                  <Link to="#!">iVMS Tracker</Link>
                </p>
                <p>
                  <Link to="#!">Mafuta tracker</Link>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful links
                </h6>
                <p>
                  <Link to="#!">Your Account</Link>
                </p>
                <p>
                  <Link to="#!">Careers</Link>
                </p>
                <p>
                  <Link to="#!">Supports</Link>
                </p>
                <p>
                  <Link to="#!">Help</Link>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> Kampala, Muyenga II, UG
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> info@3dservices.co.ug
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> Help Desk:
                  +256-393-608-888
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> Sales: +256-393-708-888
                </p>
              </div>
            </div>

            <hr />

            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8">
                <p className="text-center text-md-left">
                  © 2020 Copyright:
                  <Link to="http://3dservices.co.ug/">
                    <strong> 3DServices.co.ug</strong>
                  </Link>
                </p>
              </div>

              <div className="col-md-5 col-lg-4 ml-lg-0">
                <div className="text-center text-md-right">
                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <Link
                        to="https://www.facebook.com/"
                        className="btn-floating btn-sm rgba-white-slight mx-1"
                      >
                        <i className="fab fa-facebook fa-2x"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="https://twitter.com/"
                        className="btn-floating btn-sm rgba-white-slight mx-1"
                      >
                        <i className="fab fa-twitter fa-2x"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="https://www.linkedin.com/"
                        className="btn-floating btn-sm rgba-white-slight mx-1"
                      >
                        <i className="fab fa-linkedin-in fa-2x"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default FooterComponent;
