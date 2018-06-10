const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Job Model
const Job = require('../../model/Job');

// @route   GET api/jobs/test
// @desc    Tests job route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Jobs Works' }));


// @route   GET api/jobs
// @desc    Get jobs
// @access  Public
router.get('/', (req, res) => {
  Job.find()
    .sort({ date: -1 })
    .then(jobs => res.json(jobs))
    .catch(err => res.status(404).json({ nojobsfound: 'No jobs found' }));
});

// @route   GET api/jobs/:id
// @desc    Get job by id
// @access  Public
router.get('/:id', (req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job))
    .catch(err =>
      res.status(404).json({ nojobfound: 'No job found with that ID' })
    );
});

// @route   POST api/jobs
// @desc    Create job
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const newJob = new Job({
    title: req.body.title,
    category: req.body.category,
    country: req.body.country,
    city: req.body.city,
    description: req.body.description
  });

  newJob.save().then(job => res.json(job));
});

module.exports = router;