const mongoose = require("mongoose");

const Subjectsschema = mongoose.Schema({
  department: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  subjectCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  subjectName: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  totalLectures: {
    type: Number,
    default: 12,
    trim: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  attendence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "attendence",
    trim: true,
  },
});

//exports.Subjects = mongoose.model("Subjects", Subjectsschema);
module.exports = mongoose.model("Subjects", Subjectsschema);
