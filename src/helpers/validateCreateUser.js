import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
export default function validateInput(data) {
  let errors = {};

  // Email validation
  if (data.email === '') errors.email = 'Email is required';
  else if (!validator.isEmail(data.email))
    errors.email = 'Email is not correct';

  // Password validation
  if (data.password === '') errors.password = 'Password is required';
  else if (data.password.length < 4)
    errors.password = 'Password must be greater 3 characters';
  if (data.passwordConfirmation == null)
    errors.passwordConfirmation = 'Password Confirmation is required';
  if (
    data.password !== '' &&
    data.passwordConfirmation !== '' &&
    !validator.equals(data.password, data.passwordConfirmation)
  )
    errors.passwordConfirmation = 'Passwords must match';

  // Check for department selection
  if (data.departmentId === '')
    errors.departmentId = 'Please select department';

  // Check for the roles validation
  if (data.roles.length === 0) errors.roles = 'Please select employee type';
  if (data.phoneNumber === '') errors.phoneNumber = 'Phone Number is required';
  if (data.username === '') errors.username = 'Full Name is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
