const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./app');

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork workers based on CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Replace the dead worker
        cluster.fork();
    });
} else {
    // Workers can share any TCP connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}