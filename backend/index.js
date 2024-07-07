const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');

const app = express();
const port = 5000;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Route handlers
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', require('./routes/Auth'));

// Connect to MongoDB and start the server
db(async (err, data, CatData) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process with failure
  }
  global.foodData = data;
  global.foodCategory = CatData;

  // Start the server only after successful database connection
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
});
