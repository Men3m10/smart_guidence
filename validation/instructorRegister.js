const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateInstructor = (data) => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.ssid_Hash = !isEmpty(data.ssid_Hash) ? data.ssid_Hash : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.name, { min: 2, max: 100 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }
  // if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
  //   errors.password = "Password must contain at least 8 character";
  // }

  if (!Validator.isLength(data.ssid_Hash, { min: 14, max: 14 })) {
    errors.ssid_Hash = "SSID must be 14 char";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateInstructor;
