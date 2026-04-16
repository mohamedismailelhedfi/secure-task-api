const express = require('express');
const router = express.Router();
const fs = require('fs');

const DATA_FILE = './data/tasks.json';

// GET tasks
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// POST task
router.post('/', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));

  // ❌ Vulnerability: no validation
  const newTask = req.body;

  tasks.push(newTask);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));

  res.status(201).json(newTask);
});

module.exports = router;