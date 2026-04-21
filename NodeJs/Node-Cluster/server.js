const cluster = require("cluster");
const express = require("express");
const os = require("os");

const totalCPUs = os.cpus().length;
const PORT = 8000;

if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    console.log(`Forking ${totalCPUs} worker processes...`);
    
    // Fork worker processes
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    // Handle worker exit and restart
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died (${signal || code}). Restarting...`);
        cluster.fork();
    });

    // Handle primary process errors
    cluster.on("error", (error) => {
        console.error("Cluster error:", error);
    });
} else {
    const app = express();

    app.get("/", (req, res) => {
        return res.json({message: `Hello From Express Server ${process.pid} 🚀`});
    });

    // Correct callback syntax - listener is a function with no parameters
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started at http://localhost:${PORT}`);
    });

    // Handle worker errors :-
    process.on("error", (error) => {
        console.error(`Worker ${process.pid} error:`, error);
    });
}