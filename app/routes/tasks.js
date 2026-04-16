const express = require('express');
const router = express.Router();
const fs = require('fs');

const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

// GET tasks
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// POST task
router.post('/', (req, res) => {
  try {
    const tasks = JSON.parse(fs.readFileSync(DATA_FILE));

    const newTask = req.body; //vulnerability

    tasks.push(newTask);
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));

    res.status(201).json(newTask);

  } catch (err) {
    console.error("ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;