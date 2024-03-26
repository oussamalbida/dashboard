const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const setupLoginRoute = require("./routes/login.js");

const server = 3001; // Corrected variable name

const rout = require("./routes/Routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard/src/sence/autontification/Authontification2.js"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard/src/routes/Routes.js"));
});

setupLoginRoute(app);



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
