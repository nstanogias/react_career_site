const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    }

}, {timestamps:true})

const Test = mongoose.model('Test', testSchema);

module.exports = { Test }