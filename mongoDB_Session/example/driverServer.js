//Without Mongoose

//These repository contains example code, it is not configured to run!

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// Connect to MongoDB using the MongoDB Node.js driver
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Routes
app.get('/users', async (req, res) => {
  try {
    const db = client.db('mydatabase');
    const collection = db.collection('users');
    const users = await collection.find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
