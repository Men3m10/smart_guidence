const mongoose = require("mongoose");

const adminsSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  ssid_Hash: { type: String, required: true, unique: true, trim: true },
  department: { type: String, trim: true, uppercase: true },
  password_hash: { type: String, required: true },
});

// exports.Admins = mongoose.model("Admins", adminsSchema);
module.exports = mongoose.model("Admins", adminsSchema);
