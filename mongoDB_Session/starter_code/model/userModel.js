const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String ,unique: true },
  age: { type: Number, min: 18 },
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;


//Already Modularized some of our code here