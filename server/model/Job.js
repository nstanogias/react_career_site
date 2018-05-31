const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: {
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
  },
  description: {
    type: String,
    required: true
  },
  users: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }]
}, {timestamps: true});

const Job = mongoose.model('jobs', jobSchema);

module.exports = {Job};