import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/employeeComponent.css';
import profile from '../../assets/images/profile.jpg';
import { fetchUser } from '../../redux/users/actions/fetchUserActions';

export class EmployeeComponent extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.match.params.id);
  }
  render() {
    const user = this.props.userData.user;
    if (!user) {
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
                  src={profile}
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
                            <span className="fa fa-asterisk text-secondary mr-1"></span>
                            Identification
                          </strong>
                        </td>
                        <td className="text-primary">{user.id}</td>
                      </tr>
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

                      <tr>
                        <td>
                          <strong>
                            <span className="fas fa-user text-secondary mr-2"></span>
                            Role
                          </strong>
                        </td>
                        <td className="text-primary">{user.sex}</td>
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
                            Created
                          </strong>
                        </td>
                        <td className="text-primary">{user.createdAt}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa fa-calendar text-secondary mr-2"></span>
                            Modified
                          </strong>
                        </td>
                        <td className="text-primary">2{user.updatedAt}</td>
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
      userData: state.fetchUserReducer
    };
  },
  {
    fetchUser
  }
)(EmployeeComponent);
