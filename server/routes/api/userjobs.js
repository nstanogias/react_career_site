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

// @route   GET api/userjobs
// @desc    Get userjobs
// @access  Public
router.get('/', (req, res) => {
  UserJobs.find()
    .then(userjobs => res.json(userjobs))
    .catch(err => res.status(404).json({nouserjobsfound: 'No user jobs found'}));
});

// @route   GET api/userjobs/job/:id
// @desc    Get userjobs by jobId
// @access  Public
router.get('/job/:id', (req, res) => {
  UserJobs.find({jobId: req.params.id})
    .then(userjobs => res.json(userjobs))
    .catch(err =>
      res.status(404).json({nouserjobsfound: 'No userjobs found with that job ID'}));
});

// @route   GET api/userjobs/user/:id
// @desc    Get userjobs by userId
// @access  Public
router.get('/user/:id', (req, res) => {
  UserJobs.find({userId: req.params.id})
    .then(userjobs => res.json(userjobs))
    .catch(err =>
      res.status(404).json({nouserjobsfound: 'No userjobs found with that user ID'}));
});

module.exports = router;