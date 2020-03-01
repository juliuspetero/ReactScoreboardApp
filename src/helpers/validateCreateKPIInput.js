import isEmpty from 'lodash/isEmpty';
export default function validateInput(data) {
  let errors = {};

  // Email validation
  if (data.title === '') errors.title = 'Title is required';

  // Password validation
  if (data.description === '') errors.description = 'Description is required';

  // Department
  if (data.departmentId === '') errors.department = 'Department is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
