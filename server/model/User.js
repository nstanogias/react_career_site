const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 0
  },
  jobs: [{
    type: Schema.Types.ObjectId,
    ref: 'jobs'
  }]
});

module.exports = User = mongoose.model('users', userSchema);