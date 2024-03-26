const express = require("express");
const router = express.Router();
const bigacount = require("../module/bigacounts.js");
const particulier = require("../module/particuliers.js");
const revender = require("../module/revenders.js");

// Define CRUD operations for each collection
const handleCRUD = (Model) => {
  router.get(`/${Model.collection.collectionName}`, async (req, res) => {
    try {
      const tasks = await Model.find();
      res.status(200).json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Tasks not found" });
    }
  });

  router.post(`/${Model.collection.collectionName}`, async (req, res) => {
    try {
      const task = new Model(req.body);
      await task.save();
      res.status(200).json({ message: "Task saved successfully", task });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving task" });
    }
  });
};

// Call handleCRUD for each collection
handleCRUD(bigacount);
handleCRUD(particulier);
handleCRUD(revender);

module.exports = router;
