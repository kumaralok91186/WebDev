const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    fs.appendFile('log.txt',`${req.ip}, ${Date.now()}: ${req.method}: ${req.path}\n`, 
        (err, data) => {
            next();
        }
    );
});

// Routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
    return res.send(users);
});

app
    .route("/api/users/:id")
    .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
    .patch((req, res) => {
        // Edit user with id
        return res.json({status: "Pending"});
    })
    .delete((req, res) => {
        // Delete user with id
        return res.json({status: "Pending"});
    })

// .get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "Success", id: users.length});
    });
});

// app.patch("/api/users/:id", (req, res) => {
//     // TOOD: Edit the user with id
//     return res.json({status: "pending"});
// });

// app.delete("/api/users/:id", (req, res) => {
//     // TOOD: Delete the user with id
//     return res.json({status: "pending"});
// });



app.listen(PORT, () => console.log(`Server Started at PORT:${8000}`));