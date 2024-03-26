const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = 3001; // Corrected variable name

const rout = require("./routes/Routes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://admin:admin@localhost:27017/client?authSource=admin",
  { useNewUrlParser: true, useUnifiedTopology: true } // Add connection options
);

const db = mongoose.connection;

db.on("error", (err) => {
  // Add error handling for database connection
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connection successful");
});

app.use(rout);

app.listen(server, () => {
  console.log("Server listening on port", server);
});
