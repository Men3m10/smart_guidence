const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateStudentLogin = (data) => {
  let errors = {};
  data.ssid_Hash = !isEmpty(data.ssid_Hash) ? data.ssid_Hash : "";
  // data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.ssid_Hash, { min: 14, max: 14 })) {
    errors.ssid_Hash = "SSID Number must be of 14 characters";
  }

  if (Validator.isEmpty(data.ssid_Hash)) {
    errors.ssid_Hash = "SSID Number field is required";
  }

  // if (!Validator.isLength(data.code_Hash, { min: 14, max: 14 })) {
  //   errors.code_Hash = "SSID Number must be of 14 characters";
  // }
  // if (Validator.isEmpty(data.code_Hash)) {
  //   errors.code_Hash = "CODE field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateStudentLogin;
