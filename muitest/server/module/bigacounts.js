const mongoose = require("mongoose");

const taskschema = new mongoose.Schema({
  name: { type: String, required: false },
  prenome: { type: String, required: false },
  cin: { type: String, required: true },
  rc: { type: Number, required: true },
});
module.exports = mongoose.model("bigacounts", taskschema);
