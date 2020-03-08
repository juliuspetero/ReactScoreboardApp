import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../assets/css/employeeComponent.css';
import { fetchUser } from '../../redux/users/actions/fetchUserActions';
import config from '../../config/config';

export class MyDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.props.fetchUser(
      this.props.authenticateUserData.authenticateUser.userInformation.id
    );
  }

  render() {
    const user = this.props.userData.user;
    // console.log(user);
    if (user == null) {
      return <div />;
    }
    return (
      <div id="employee-component">
        <div className="container bootstrap snippet my-5">
          <h3>My Details</h3>
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
                      {/* Name */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-user text-secondary mr-2"></span>
                            Name
                          </strong>
                        </td>
                        <td className="text-primary">{user.username}</td>
                      </tr>

                      {/* Gender*/}
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-female text-secondary mr-2"></span>
                            Gender
                          </strong>
                        </td>
                        <td className="text-primary">{user.sex}</td>
                      </tr>

                      {/* EMAIL */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-envelope text-secondary mr-2"></span>
                            Email
                          </strong>
                        </td>
                        <td className="text-primary">{user.email}</td>
                      </tr>

                      {/* PHONE NUMBER */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-phone text-secondary mr-2"></span>
                            Phone
                          </strong>
                        </td>
                        <td className="text-primary">{user.phoneNumber}</td>
                      </tr>

                      {/* PHYSICAL ADDRESS */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-home text-secondary mr-2"></span>
                            Address
                          </strong>
                        </td>
                        <td className="text-primary">{user.address}</td>
                      </tr>

                      {/* CREATED AT */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-calendar text-secondary mr-2"></span>
                            Date of Account Creation
                          </strong>
                        </td>
                        <td className="text-primary">
                          {moment(user.createdAt).format('DD/MM/YYYY')}
                        </td>
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

                      {/* JOB HIERACHY */}
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

                      {/* EMPLOYEE TYPE */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fas fa-user text-secondary mr-2"></span>
                            Employee Type
                          </strong>
                        </td>
                        <td className="text-primary">
                          {user.employeeType === 'fte'
                            ? 'Full Time'
                            : user.employeeType === 'contract'
                            ? 'Contract'
                            : 'Consultant'}
                        </td>
                      </tr>

                      {/* DEPARTMENT */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fas fa-building text-secondary mr-2"></span>
                            Department
                          </strong>
                        </td>
                        <td className="text-primary">
                          {user.department.title}
                        </td>
                      </tr>

                      {/* JOB DESCRIPTION */}
                      <tr>
                        <td>
                          <strong>
                            <span className="fas fa-book text-secondary mr-2"></span>
                            Job Description
                          </strong>
                        </td>
                        <td className="text-primary">{user.jobDescription}</td>
                      </tr>
                    </tbody>
                  </table>
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
      authenticateUserData: state.authenticateUserReducer,
      userData: state.fetchUserReducer
    };
  },
  { fetchUser }
)(MyDetailsComponent);
