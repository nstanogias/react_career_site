const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const users = require('./routes/api/user');
const jobs = require('./routes/api/job');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


//DB config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('api/users', users);
app.use('api/jobs', jobs);

const {JobAdd} = require('./model/Job');
const {User} = require('./model/User');
const {auth} = require('./middleware/auth');

app.get('/', (req, res) => res.send('Hello World!'))


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