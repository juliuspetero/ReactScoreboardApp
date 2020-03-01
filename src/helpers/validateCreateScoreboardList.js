import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  // Employee validation
  if (isEmpty(data.userIds)) errors.userIds = 'Select atleast one employee ';

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
