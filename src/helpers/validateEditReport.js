import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
  // Description validation
  if (data.description == null || data.description === '')
    errors.description = 'Report description is required';
  if (data.scoreBoardId == null || data.scoreBoardId === '')
    errors.scoreboard = 'Scoreboard is required';
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
