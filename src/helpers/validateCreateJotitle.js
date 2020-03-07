import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  // Title of the job title
  if (data.title === '') errors.title = 'Title is required';

  // Department must be provided
  if (data.departmentId === '') errors.department = 'Department is required';

  // Validation for KPPIDS,KPPId cannot be empty
  let KPIIdsEmpties = 0;
  data.KPIIds.forEach(KPIId => {
    if (KPIId === '') KPIIdsEmpties++;
  });

  if (KPIIdsEmpties > 0) errors.KPIIds = 'KPIs cannot be empty';

  // Validate KPIWeights, not empty
  let KPIWeightEmpties = 0;
  data.KPIWeights.forEach(KPIWeight => {
    if (KPIWeight < 0 || KPIWeight > 100)
      errors.range = 'KPI Weights must be between 0 and 10';
    if (KPIWeight === '') KPIWeightEmpties++;
  });

  if (KPIWeightEmpties > 0) errors.KPIWeights = 'KPI Weights cannot be empty';

  // Check that the scoreboard has no duplicate KPIs
  if (hasDuplicates(data.KPIIds)) errors.duplicates = 'No uplicate KPIs de';

  // Check if no KPI has been selected
  if (data.KPIIds.length === 0) errors.empty = 'Atleast one KPI is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}
