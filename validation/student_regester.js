const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateStudent = (data) => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.ssid_Hash = !isEmpty(data.ssid_Hash) ? data.ssid_Hash : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  data.section = !isEmpty(data.section) ? data.section : "";
  data.code_Hash = !isEmpty(data.code_Hash) ? data.code_Hash : "";
  data.uni_email = !isEmpty(data.uni_email) ? data.uni_email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (!Validator.isLength(data.name, { min: 2, max: 100 })) {
    errors.name = "Name must be between 2 and 100 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.phone, { min: 11, max: 14 })) {
    errors.phone = "phone must be between 11 and 14 number";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "phone field is required";
  }

  if (Validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }

  if (Validator.isEmpty(data.uni_email)) {
    errors.uni_email = "uni_email field is required";
  }

  if (!Validator.isEmail(data.uni_email)) {
    errors.uni_email = "Email is invalid";
  }

  if (Validator.isEmpty(data.section)) {
    errors.section = "Section field is required";
  }

  if (!Validator.isLength(data.ssid_Hash, { min: 14, max: 14 })) {
    errors.ssid_Hash = "SSID must be 14 char";
  }

  if (!Validator.isLength(data.code_Hash, { min: 14, max: 14 })) {
    errors.code_Hash = "code must be 14 char";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateStudent;
