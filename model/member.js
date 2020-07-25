const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    hobby : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    dateTime : {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Member', memberSchema);