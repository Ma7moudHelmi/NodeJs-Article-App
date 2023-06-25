const mongoose = require("mongoose");

const userDataModel = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  fullName: { type: String, required: true },
  email: { type: String, unique: true,required: true },
  password: { type: String },
});

module.exports = mongoose.model("userData", userDataModel);
