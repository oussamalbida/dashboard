const mongoose = require("mongoose");

const acountSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  cin: { type: String, required: false },
  rc: { type: Number, required: false },
  ice: { type: Number, required: false },
});

module.exports = mongoose.model("acounts", acountSchema);
