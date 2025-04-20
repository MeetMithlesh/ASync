const express = require("express");
const router = express.Router();
const {Bill} = require("../schema");

// Create a new bill
router.post("/", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    const savedBill = await newBill.save();
    res.status(201).json(savedBill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bill by ID
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payment status
router.put("/:id", async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a bill
router.delete("/:id", async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: "Bill deleted", deletedBill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
