//importing required modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Passport Config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/files', require('./routes/fileUpload'));
app.use('/sentiment', require('./routes/sentiment'));

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});