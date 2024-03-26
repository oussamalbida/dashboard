const express = require("express");
const router = express.Router();
const Cliens = require("../module/cliensSchema");
const Acount = require("../module/acountSchema");
const User = require("../module/User");

// CRUD operations for Cliens collection
router.get("/apiClient", async (req, res) => {
  try {
    const clients = await Cliens.find();
    res.status(200).json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Clients not found" });
  }
});

router.post("/apiClient", async (req, res) => {
  try {
    const client = new Cliens(req.body);
    await client.save();
    res.status(201).json({ message: "Client added successfully", client });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.put("/apiClient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const client = await Cliens.findByIdAndUpdate(id, dataToUpdate, { new: true });
    res.status(200).json({ message: "Client updated successfully", client });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/apiClient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Cliens.findByIdAndDelete(id);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// CRUD operations for Acount collection
router.get("/apiAcount", async (req, res) => {
  try {
    const accounts = await Acount.find();
    res.status(200).json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Accounts not found" });
  }
});

router.post("/apiAcount", async (req, res) => {
  try {
    const account = new Acount(req.body);
    await account.save();
    res.status(201).json({ message: "Account added successfully", account });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.put("/apiAcount/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const account = await Acount.findByIdAndUpdate(id, dataToUpdate, { new: true });
    res.status(200).json({ message: "Account updated successfully", account });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/apiAcount/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Acount.findByIdAndDelete(id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});
router.get("/userApi", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Accounts not found" });
  }
});

module.exports = router;
