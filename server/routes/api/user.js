const express = require('express');
const router = express.Router();

//Load User model
const User  = require('../../model/User')

//Load Input Validation
const validateRegisterInput = require('../../validation/register');

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: 'Users Works'}));

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register',(req,res)=>{
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

module.exports = router;