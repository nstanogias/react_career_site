const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/user');
const jobs = require('./routes/api/job');
const userjobs = require('./routes/api/userjobs');
const profile = require('./routes/api/profile');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/jobs', jobs);
app.use('/api/userjobs', userjobs);
app.use('/api/profile', profile);

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(3001, () => console.log('Example app listening on port 3001!'));