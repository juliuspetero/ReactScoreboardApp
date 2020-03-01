import isEmpty from 'lodash/isEmpty';
export default function validateInput(data) {
  let errors = {};

  // Email validation
  if (data.title === '') errors.title = 'Title is required';
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
