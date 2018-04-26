const mongoose = require('mongoose');

const jobAddSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    city: {
        type:String,
        required: true
    }

}, {timestamps:true})

const JobAdd = mongoose.model('JobAdd', jobAddSchema);

module.exports = { JobAdd }