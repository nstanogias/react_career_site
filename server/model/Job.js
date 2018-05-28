const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Job = mongoose.model('jobs', jobSchema);

module.exports = {Job};