import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from './users.js';

dotenv.config();

const app = express();
const PORT = 3002;


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
;

app.use(express.json());

// CREATING USER
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// GET USERS
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Updating a user
app.put("/api/users/:id", async (req, res) => { 
  try {
    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Deleting a user
app.delete("/api/users/:id", async (req, res) => { 
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

