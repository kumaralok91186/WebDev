const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
    return res.json({message: `Hello From Express Server ${process.pid} 🚀`});
});

app.listen(PORT, (req, res) => {
    console.log(`Server Started At http://localhost:${PORT}`);
});