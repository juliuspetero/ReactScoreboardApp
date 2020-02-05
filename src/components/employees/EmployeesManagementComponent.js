// import React, { Component } from 'react';
// import { Route, Link, Switch } from 'react-router-dom';
// import EmployeesComponent from '../employees-management/EmployeesComponent';
// import CreateEmployeeComponent from '../employees-management/CreateEmployeeComponent';
// import EmployeeDetailsComponent from '../employees-management/EmployeeDetailsComponent';
// import { UnauthorizedUserFlashMessage } from '../messages/UnauthorizedUserFlashMessage';

// class EmployeesManagementComponent extends Component {
//   render() {
//     return (
//       <div>
//         <UnauthorizedUserFlashMessage />
//         <Link
//           className="btn btn-secondary my-2"
//           to={`${this.props.match.url}/all-employees`}
//         >
//           View All Employees
//         </Link>
//         <Link
//           className="btn btn-secondary my-2 mx-2 "
//           to={`${this.props.match.url}/create-employee`}
//         >
//           Add an Employee
//         </Link>
//         <Switch>
//           <Route
//             exact
//             path={`${this.props.match.url}/all-employees`}
//             component={EmployeesComponent}
//           />
//           <Route
//             path={`${this.props.match.url}/create-employee`}
//             component={CreateEmployeeComponent}
//           />
//           <Route
//             path={`${this.props.match.url}/all-employees/:id`}
//             component={EmployeeDetailsComponent}
//           />
//         </Switch>
//       </div>
//     );
//   }
// }

// export default EmployeesManagementComponent;
