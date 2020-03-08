import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import '../../assets/css/employeeComponent.css';
import { fetchUser } from '../../redux/users/actions/fetchUserActions';
import DeleteButtonComponent from './DeleteEmployeeButtonComponent';
import config from '../../config/config';

export class EmployeeComponent extends Component {
  deleteEmployee = async id => {
    await axios.delete(`${config.baseUrl}/users/${id}`);
    this.props.history.push('/admin/all-employees');
  };

  componentWillMount() {
    this.props.fetchUser(this.props.match.params.id);
  }
  render() {
    const user = this.props.userData.user;
    if (isEmpty(user)) {
      return <div />;
    }
    // return null;
    return (
      <div id="employee-component">
        <div className="container bootstrap snippet my-5">
          <h3>Information</h3>
          <div className="panel-body inf-content">
            <div className="row">
              <div className="col-md-4">
                <img
                  alt=""
                  style={{ width: '600px' }}
                  title=""
                  className="img-circle img-thumbnail isTooltip"
                  src={`${config.baseUrl}/uploads/${
                    user.photoUrl ? user.photoUrl : 'noimage.png'
                  }`}
                  data-original-title="Usuario"
                />
              </div>
              <div className="col-md-6 text-left">
                <div className="table-responsive">
                  <table className="table table-condensed table-responsive table-user-information text-left">
                    <tbody>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-user text-secondary mr-2"></span>
                            User Name
                          </strong>
                        </td>
                        <td className="text-primary">{user.username}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-envelop text-secondary mr-2"></span>
                            Email
                          </strong>
                        </td>
                        <td className="text-primary">{user.email}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-bookmark text-secondary mr-2"></span>
                            Phone Number
                          </strong>
                        </td>
                        <td className="text-primary">{user.phoneNumber}</td>
                      </tr>

                      {/* Job title of the employee */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fas fa-key text-secondary mr-2"></span>
                            Job Title
                          </strong>
                        </td>
                        <td className="text-primary">
                          {user.jobtitle ? user.jobtitle.title : null}
                        </td>
                      </tr>

                      {/* Job Hierachy */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fas fa-user text-secondary mr-2"></span>
                            Job Hierachy
                          </strong>
                        </td>
                        <td className="text-primary">
                          {user.roles ? user.roles[0].name : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-home text-secondary mr-2"></span>
                            Address
                          </strong>
                        </td>
                        <td className="text-primary">{user.address}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-calendar text-secondary mr-2"></span>
                            Created At
                          </strong>
                        </td>
                        <td className="text-primary">
                          {moment(user.createdAt).format('DD/MM/YYYY')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Buttons */}
                <div className="text-center my-2">
                  <DeleteButtonComponent
                    employee={user}
                    deleteEmployee={this.deleteEmployee}
                  />
                  <Link
                    to={`/manager/edit-employee/${user.id}`}
                    className="btn btn-primary mx-2"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/manager/scoreboardlayout/${user.id}`}
                    className="btn btn-primary mx-2"
                  >
                    View KPIs
                  </Link>
                  <Link
                    to={`/manager/all-scoreboards/${user.id}`}
                    className="btn btn-primary mx-2"
                  >
                    View Scoreboards
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      userData: state.fetchUserReducer
    };
  },
  {
    fetchUser
  }
)(EmployeeComponent);
