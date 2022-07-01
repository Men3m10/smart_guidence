const mongoose = require("mongoose");

const attendenceSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subjects",
  },
  totalLecturesByinstructor: {
    type: Number,
    default: 0,
    trim: true,
  },
  lectureAttended: {
    type: Number,
    default: 0,
    trim: true,
  },
});

module.exports = mongoose.model("attendence", attendenceSchema);
