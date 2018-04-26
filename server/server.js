const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local');

const { JobAdd } = require('./model/jobAdd');
const { Test } = require('./model/test');

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/jobadds',(req,res)=>{
    // ORDER = asc || desc
    JobAdd.find().exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
});

const addJobAdd = new JobAdd({
    name: 'PHP Developer',
    category: 'IT',
    city: 'Athens'
});

addJobAdd.save(function (err) {
    if(err) return console.log(err)
});

const testToAdd = new Test( {
    description: 'fasdasda'
});

testToAdd.save(function (err) {
    if(err) return console.log(err)
});

app.listen(3001, () => console.log('Example app listening on port 3001!'))