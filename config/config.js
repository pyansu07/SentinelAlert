require('dotenv').config();

module.exports = {
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/request-monitor',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
    },
    email: {
        smtp: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        },
        from: process.env.EMAIL_FROM,
        to: process.env.ALERT_EMAIL_TO,
    },
    monitoring: {
        timeWindowMinutes: 10,
        failureThreshold: 5,
        requestsPerSecondLimit: 500,
    },
}; 