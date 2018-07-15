const mongoose = require('mongoose');

const userJobsSchema  = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  jobId: {
    type: String,
    required: true
  },
  profileNickname: {
    type: String,
    required: true
  },
  isAccepted: {
    type: Number,
    default: 0
  }
});

module.exports = UserJobs = mongoose.model('userjobs', userJobsSchema);