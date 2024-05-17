//importing required modules
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

//registering user controller

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

//logging in the user controller

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ message: 'Login failed due to server error' });
    }
    if (!user) {
      console.error('Authentication failed:', info);
      return res.status(400).json({ message: 'Login failed', info });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Login failed due to server error' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    });
  })(req, res, next);
};
