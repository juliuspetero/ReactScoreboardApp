import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
export default function validateInput(data) {
  let errors = {};

  // Email validation
  if (data.email === '') errors.email = 'Email is required';
  else if (!validator.isEmail(data.email))
    errors.email = 'Email is not correct';

  // Do not validate password when it is empty
  console.log(data.password);
  if (!isEmpty(data.password)) {
    if (data.password.length < 4)
      errors.password = 'Password must be greater 3 characters';
    if (data.passwordConfirmation == null || data.passwordConfirmation === '')
      errors.passwordConfirmation = 'Password Confirmation is required';
    if (
      data.password !== '' &&
      data.passwordConfirmation !== '' &&
      !validator.equals(data.password, data.passwordConfirmation)
    )
      errors.passwordConfirmation = 'Passwords must match';
  }

  // Check for department selection
  if (data.departmentId === '')
    errors.departmentId = 'Please select department';

  // Check for the job title and employee type
  if (data.jobtitleId === '') errors.jobtitle = 'Please select job title';
  if (data.employeeType === '') errors.employeeType = 'Please Employee Type';

  // Check for the roles validation
  if (isArray(data.roles)) {
    if (data.roles[0] === '') errors.roles = 'Please select employee hierachy';
  }

  if (data.phoneNumber === '') errors.phoneNumber = 'Phone Number is required';
  if (data.username === '') errors.username = 'Full Name is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
