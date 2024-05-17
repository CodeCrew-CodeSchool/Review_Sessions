const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/userModel'); // Import the User model

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/test2').then(() => {
    console.log("We're connected baby!")
}).catch((err) => {
    console.error("Error connecting to our database:", err);
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(
            {
                name:req.body.name,
                email:req.body.email,
                age:req.body.age
            }
        );
        await newUser.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({error: err.message})
    }
})

app.listen(PORT, () => {
    console.log(`Our Server is up on:http://localhost:${PORT}`)
})