const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local');

const { JobAdd } = require('./model/jobAdd');

app.use(bodyParser.json())


// GET //
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/getJobAdd', (req, res) => {
    let id = req.query.id;

    JobAdd.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
});

app.get('/api/jobAdds',(req,res)=>{
    // ORDER = asc || desc
    JobAdd.find().exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
});

// POST //
app.post('/api/jobAdd',(req,res)=>{
    const jobAdd = new JobAdd(req.body)

    jobAdd.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            jobAddId: doc._id
        })
    })
});

// UPDATE //
app.post('/api/jobAdd_update',(req,res)=>{
    JobAdd.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
});

// DELETE //
app.delete('/api/delete_jobAdd',(req,res)=>{
    let id = req.query.id;

    JobAdd.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
});

app.listen(3001, () => console.log('Example app listening on port 3001!'))