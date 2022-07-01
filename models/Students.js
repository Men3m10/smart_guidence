const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  year: { type: String, required: true, trim: true },
  uni_email: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, default: "", trim: true },
  department: { type: String, required: true, trim: true, uppercase: true },
  division: { type: String, default: "", trim: true },
  preference: { type: String, default: "", trim: true },
  gender: { type: String, required: true, trim: true },
  code_Hash: { type: String, required: true, unique: true, trim: true },
  ssid_Hash: { type: String, required: true, unique: true, trim: true },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subjects",
      trim: true,
    },
  ],
  section: { type: String, required: true, trim: true },
});

//exports.Students = mongoose.model("Students", studentsSchema);
module.exports = mongoose.model("Students", studentsSchema);
