const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateInstructorDepart = (data) => {
  let errors = {};
  data.department = !isEmpty(data.department) ? data.department : "";

  if (Validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateInstructorDepart;
