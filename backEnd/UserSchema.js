const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  abr: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  userName: { type: String, required: true },
  mobile: { type: String, required: true },
  currentAge: Object,
  dob: { type: String, required: true },
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
