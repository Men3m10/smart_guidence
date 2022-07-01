const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateStudentSectionbySSID = (data) => {
  let errors = {};
  data.ssid_Hash = !isEmpty(data.ssid_Hash) ? data.ssid_Hash : "";

  if (Validator.isEmpty(data.ssid_Hash)) {
    errors.ssid_Hash = "SSID Number field is required";
  }

  if (!Validator.isLength(data.ssid_Hash, { min: 14, max: 14 })) {
    errors.ssid_Hash = "SSID must be 14 char";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateStudentSectionbySSID;
