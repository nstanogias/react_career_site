const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/api/user');
const jobs = require('./routes/api/job');

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


app.use('/api/users', users);
app.use('/api/jobs', jobs);


app.get('/', (req, res) => res.send('Hello World!'));


app.listen(3001, () => console.log('Example app listening on port 3001!'));