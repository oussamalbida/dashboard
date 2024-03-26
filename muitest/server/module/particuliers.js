const mongoose = require("mongoose");

const taskschema = new mongoose.Schema({
  name: { type: String, required: false },
  prenome: { type: String, required: false },
  cin:{type:String,required: true},
  telephone: { type: String, required:false}
});
module.exports = mongoose.model("particuliers", taskschema);
