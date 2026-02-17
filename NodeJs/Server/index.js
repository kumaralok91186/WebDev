const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} New Req Received\n`
    const myUrl = url.parse(req.url, true);
    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname) {
            case '/': 
                if(req.method === "GET") res.end("Home Page");
                break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                break;
            case '/signup':
                if(req.method === 'GET') res.end("This is a signup From");
                else if(req.method === "POST") {
                    // DB Qury
                    res.end("Success");
                }
                break;
            default: 
                res.end("404 not found");
        }
    })
});

myServer.listen(8000, () => {
    console.log("Server Started!");
})
