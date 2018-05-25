const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  let id = req.query.id;

  Job.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  })
});

router.get('/', (req, res) => {
  Job.find().exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  })
});

router.post('/jobAdd', (req, res) => {
  const jobAdd = new JobAdd(req.body)

  job.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      jobAddId: doc._id
    })
  })
});

router.post('/api/job_update', (req, res) => {
  Job.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    })
  })
});

router.delete('/api/delete_job', (req, res) => {
  let id = req.query.id;

  Job.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true)
  })
});

module.exports = router;