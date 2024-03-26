const mongoose = require("mongoose");

const cliensSchema = new mongoose.Schema({
  nubCommand: { type: String, required: false },
  date: {
    type: String,
    default: function() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1; 
      const year = today.getFullYear();
      return day + "/" + month + "/" + year;
    }
  },
  client: { type: String, required: false },
  totalHt: { type: Number, required: false },
  city: { type: String, required: false ,default:'' },
  name: { type: String, required: false ,default:''},
  articleinfo: [
    {
      article: { type: String, required: false ,default:''},
      contite: { type: Number, required: false ,default:''},
      prix: { type: Number, required: false ,default:''},
      total: { type: Number, required: false ,default:''}
    }
  ]
});

module.exports = mongoose.model("Cliens", cliensSchema);
