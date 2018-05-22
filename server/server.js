const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local');

const {JobAdd} = require('./model/JobAdd');
const {User} = require('./model/User');
const {auth} = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

//---------------------------JOBADD_API----------------------------------
// GET //
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/getJobAdd', (req, res) => {
  let id = req.query.id;

  JobAdd.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  })
});

app.get('/api/jobAdds', (req, res) => {
  JobAdd.find().exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  })
});

// POST //
app.post('/api/jobAdd', (req, res) => {
  const jobAdd = new JobAdd(req.body)

  jobAdd.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      jobAddId: doc._id
    })
  })
});

// UPDATE //
app.post('/api/jobAdd_update', (req, res) => {
  JobAdd.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    })
  })
});

// DELETE //
app.delete('/api/delete_jobAdd', (req, res) => {
  let id = req.query.id;

  JobAdd.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true)
  })
});

//-------------------------------------USER_API---------------------------------
app.post('/api/register',(req,res)=>{
  const user = new User(req.body);

  user.save((err,doc)=>{
    if(err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json({
      success:true,
      user:doc
    })
  })
})

app.post('/api/login',(req,res)=>{
  User.findOne({'email':req.body.email},(err,user)=>{
    if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch) return res.json({
        isAuth:false,
        message:'Wrong password'
      });

      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        res.cookie('auth',user.token).json({
          isAuth:true,
          id:user._id,
          email:user.email
        })
      })
    })
  })
})

app.get('/api/users',(req,res)=>{
  User.find({},(err,users)=>{
    if(err) return res.status(400).send(err);
    res.status(200).send(users)
  })
})

app.get('/api/logout', auth, (req,res)=>{
  req.user.deleteToken(req.token,(err,user)=>{
    if(err) return res.status(400).send(err);
    res.sendStatus(200)
  })
})

app.get('/api/auth',auth,(req,res)=>{
  res.json({
    isAuth:true,
    id:req.user._id,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname
  })
});
app.listen(3001, () => console.log('Example app listening on port 3001!'))