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

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
