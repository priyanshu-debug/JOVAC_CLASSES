const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models/schemas');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email: email, password: hashedPassword });
  await newUser.save();
  res.send("User Register Ho Gaya!");
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.send("User nahi mila!");

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) res.send("Login Successful!");
  else res.send("Galat Password!");
});

module.exports = router;