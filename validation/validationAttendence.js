const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateAttendence = (data) => {
  let errors = {};

  data.year = !isEmpty(data.year) ? data.year : "";
  data.selectedStudents = !isEmpty(data.selectedStudents)
    ? data.selectedStudents
    : "";
  data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : "";
  data.section = !isEmpty(data.section) ? data.section : "";

  if (Validator.isEmpty(data.year)) {
    errors.year = "year field is required";
  }
  if (Validator.isEmpty(data.selectedStudents)) {
    errors.selectedStudents = "selectedStudents field is required";
  }
  if (Validator.isEmpty(data.subjectCode)) {
    errors.subjectCode = "subjectCode field is required";
  }
  if (Validator.isEmpty(data.section)) {
    errors.section = "section field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateAttendence;
