const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const config = require('./config/config');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const apiRoutes = require('./routes/api');
const metricsRoutes = require('./routes/metrics');

function createApp() {
    const app = express();

    // Connect to MongoDB
    mongoose.connect(config.mongodb.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));

    // Rate limiting middleware
    const limiter = rateLimit({
        windowMs: 1000, // 1 second
        max: config.monitoring.requestsPerSecondLimit, // 500
    });

    app.use(express.json());
    app.use(limiter);

    // Routes
    app.use('/api', apiRoutes);
    app.use('/metrics', metricsRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
    });

    return app;
}

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork workers based on CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const app = createApp();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}

module.exports = createApp; 