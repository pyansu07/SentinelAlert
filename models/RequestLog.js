const mongoose = require('mongoose');

const requestLogSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        index: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true,
    },
    failureReason: {
        type: String,
        required: true,
    },
    headers: {
        type: Object,
        required: true,
    },
    endpoint: {
        type: String,
        required: true,
    },
});

// Create compound index for efficient querying
requestLogSchema.index({ ip: 1, timestamp: 1 });

module.exports = mongoose.model('RequestLog', requestLogSchema); 