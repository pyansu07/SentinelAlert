const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    failedAttempts: {
        type: Number,
        required: true,
    },
    firstFailure: {
        type: Date,
        required: true,
    },
    lastFailure: {
        type: Date,
        required: true,
    },
    notificationSent: {
        type: Boolean,
        default: false,
    },
    notificationTime: Date,
});

module.exports = mongoose.model('Alert', alertSchema); 