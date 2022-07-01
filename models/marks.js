const mongoose = require("mongoose");
const { Schema } = mongoose;

const markSchema = new Schema({
  students: {
    type: Schema.Types.ObjectId,
    ref: "Students",
    trim: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subjects",
    trim: true,
  },
  exam: {
    type: String,
    required: true,
    trim: true,
  },
  marks: {
    type: Number,
    default: 0,
    trim: true,
  },
  totalMarks: {
    type: Number,
    default: 100,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
    uppercase: true,
  },
  year: {
    type: Number,
    trim: true,
  },
  section: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("mark", markSchema);
