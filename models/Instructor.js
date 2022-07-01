const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },

  subjectsCanTeach: [{ type: String }],
  ssid_Hash: { type: String, required: true },
  // designation: {
  //   type: String,
  //   required: true,
  // },
  // otp: {
  //   type: String,
  // },
});
//exports.Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = mongoose.model("Instructor", instructorSchema);
