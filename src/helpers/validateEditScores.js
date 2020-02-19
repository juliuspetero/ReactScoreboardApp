import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
  //   Validate that the Scores can only be from 0 to 100
  data.KPIScores.forEach(KPIScore => {
    if (KPIScore === '') errors.KPIScore = 'KPI Score is required';
    if (KPIScore < 0 || KPIScore > 100)
      errors.range = 'KPI scores must be between 0 and 100';
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
