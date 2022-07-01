const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateAttendence = (data) => {
  let errors = {};

  data.year = !isEmpty(data.year) ? data.year : "";
  data.department = !isEmpty(data.department) ? data.department : "";

  if (Validator.isEmpty(data.year)) {
    errors.year = "year field is required";
  }

  if (Validator.isEmpty(data.department)) {
    errors.department = "department field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateAttendence;
