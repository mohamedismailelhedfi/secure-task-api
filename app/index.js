const express = require('express');
const app = express();

app.use(express.json());

const tasksRoute = require('./routes/tasks');
app.use('/tasks', tasksRoute);

// ❌ Vulnerability: unsanitized input (simulates bad practice)
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`You searched for: ${query}`);
});

app.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}