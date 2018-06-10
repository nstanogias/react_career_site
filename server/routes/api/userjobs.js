const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load UserJobs Model
const UserJobs = require('../../model/UserJobs');

// @route   GET api/userjobs/test
// @desc    Tests userjobs route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'UserJobs Works' }));

// @route   POST api/userjobs
// @desc    Assign user to job
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const newUserJob = new UserJobs({
    userId: req.body.userId,
    jobId: req.body.jobId
  });
  newUserJob.save().then(userjob => res.json(userjob));
});

module.exports = router;