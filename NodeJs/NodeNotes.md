# 📘 Node.js Notes (Beginner Revision)

---

## 🚀 1️⃣ What is Node.js?

* **Node.js ek Runtime Environment hai.**
* Ye JavaScript ko **browser ke bahar (server side)** run karne ke liye use hota hai.
* Node.js me **sirf JavaScript ka core functionality** hota hai.
* Ye mainly **Server Side Development** ke liye use hota hai.

---

## ❌ Browser vs Node.js Difference

Node.js me kuch browser features nahi hote:

* ❌ `window` object nahi hota
* ❌ `DOM` functions nahi hote (UI manipulate karne wale functions)

Kyuki Node.js browser ke liye nahi, **server side programming** ke liye bana hai.

---

## ⚙️ 2️⃣ Node.js uses V8 Engine

Node.js Google Chrome ke **V8 JavaScript Engine** ka use karta hai.

### 🔹 V8 Engine kya hai?

* V8 ek **JavaScript Engine** hai.
* Ye Google Chrome ke andar JavaScript ko run karta hai.
* Ye JavaScript code ko **Machine Code** me convert karta hai.

---

## 🔄 Simple Execution Flow

```
JavaScript Code → V8 Engine → Machine Code → Run on Computer
```

### Difference:

| Chrome                           | Node.js                              |
| -------------------------------- | ------------------------------------ |
| V8 browser ke andar run hota hai | V8 standalone system me run hota hai |
| Client side                      | Server side                          |

---

## 📦 3️⃣ NPM (Node Package Manager)

* NPM ka full form hai: **Node Package Manager**
* Ye packages (libraries) install karne ke liye use hota hai.
* Ye Node ke sath automatically install ho jata hai.

---

## 🏁 4️⃣ Project Start Karna

### 🔹 Step 1: Initialize Project

```
npm init
```

Ye command ek file create karta hai:

```
package.json
```

---

## 📄 5️⃣ package.json Kya Hai?

* Ye ek **configuration file** hai.
* Isme project ki information hoti hai:

  * Project name
  * Version
  * Dependencies
  * Scripts

---

## ▶️ 6️⃣ Scripts in package.json

* Hum `package.json` me **scripts** define kar sakte hain.
* Multiple JS files ko combine karke ek single command se run kara sakte hain.
* Production me ye frequently use hota hai.

Example:

```json
"scripts": {
  "start": "node index.js"
}
```

Run karne ke liye:

```
npm start
```

---

# 🧠 Quick Revision Points

* Node.js = JavaScript Runtime Environment
* Server Side me use hota hai
* DOM & window object nahi hota
* V8 engine use karta hai
* npm = package manager
* npm init → package.json create karta hai
* package.json → project configuration file

---


---

# 📦 Node.js Modules (Structured Notes)

---

## 🚀 1️⃣ What is a Module?

* Jab hum apne bade program ko **chhote-chhote parts (files)** me divide kar dete hain, use **Modules** kehte hain.
* Module ka main purpose hai:

  * Code ko organize karna
  * Reusability badhana
  * Maintainability improve karna

👉 Har file Node.js me automatically ek module hoti hai.

---

## 🔄 2️⃣ Why We Use Modules?

* Code ko clean aur structured banane ke liye
* Multiple files me kaam karne ke liye
* Functions / variables ko reuse karne ke liye
* Team development me easy management ke liye

---

## 📤 3️⃣ Exporting in Module

Agar kisi file ke functions ya data ko dusri file me use karna ho, to hume use **export** karna padta hai.

### ✅ Single Function Export

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

---

## 📥 4️⃣ Importing (Require) Module

Dusri file me import karne ke liye:

```js
// app.js
const add = require("./math");

console.log(add(2, 3));
```

### ⚠ Important Rule:

* Agar **local file** import kar rahe ho → Path dena zaroori hai

  ```
  require("./file_name")
  ```

* Agar **Built-in module** import kar rahe ho → Path ki zarurat nahi

Example:

```js
const fs = require("fs");   // Built-in module
```

---

## 🏗 5️⃣ Built-in Modules

Node.js me kuch built-in modules already hote hain:

* `fs` → File System
* `http` → Server create karne ke liye
* `path` → File path handle karne ke liye
* `os` → Operating system info

Inhe directly name se require kar sakte hain.

---

## 📦 6️⃣ Exporting Multiple Functions

Agar ek file me multiple functions export karne hain, to hum **JavaScript Object** ka use karte hain.

### Example:

```js
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};
```

### Importing:

```js
const math = require("./math");

console.log(math.add(5, 3));
console.log(math.subtract(5, 3));
```

---

## 🧠 7️⃣ Important Concept (Correction)

✔ Har file ek module hoti hai
✔ module.exports ka use export ke liye hota hai
✔ require() ka use import ke liye hota hai
✔ Local files ke liye `./` path zaroori hota hai
✔ Built-in modules ke liye path nahi lagta

---

## 🔥 Bonus (Modern Way – ES Modules)

Node.js me modern syntax bhi use hota hai:

```js
export function add(a, b) {
  return a + b;
}
```

Import:

```js
import { add } from "./math.js";
```

⚠ Ye use karne ke liye `"type": "module"` package.json me set karna padta hai.

---

# 📌 Quick Revision Summary

* Module = Program ko small parts me divide karna
* Export → `module.exports`
* Import → `require()`
* Multiple exports → JS object
* Local file → `./filename`
* Built-in module → direct name

---


---

# 📁 Node.js – FS Module & Sync vs Async Operations

---

# 📦 1️⃣ FS (File System) Module

Node.js ka **`fs` (File System)** module files ko create, read, update, delete karne ke liye use hota hai.

👉 Ye Node.js ka **Built-in module** hai.

Import karne ke liye:

```js
const fs = require("fs");
```

---

## ✍ 2️⃣ writeFileSync()

### 🔹 Purpose:

* Nayi file create karta hai
* File me content write karta hai
* Agar file already exist karti hai to overwrite kar deta hai

### Example:

```js
const fs = require("fs");

fs.writeFileSync("demo.txt", "Hello Node.js");
```

✔ File create ho jayegi
✔ "Hello Node.js" content write ho jayega

---

## 📝 writeFile() (Async Version)

```js
fs.writeFile("demo.txt", "Hello Async", (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("File created successfully");
  }
});
```

✔ Ye asynchronous version hai
✔ Callback function use karta hai

---

# 🔄 3️⃣ Sync vs Async Operations

Node.js me operations do type ke hote hain:

| Sync                   | Async                     |
| ---------------------- | ------------------------- |
| Blocking               | Non-Blocking              |
| Line-by-line execution | Background me execution   |
| Result direct return   | Callback / Promise return |

---

## 🛑 4️⃣ Synchronous (Blocking)

* Code next line tab tak execute nahi karega jab tak current task complete na ho jaye.
* Thread block ho jata hai.
* Result directly return hota hai.

### Example:

```js
const data = fs.readFileSync("demo.txt", "utf-8");
console.log(data);
```

👉 Yaha program wait karega jab tak file read nahi hoti.

---

## ⚡ 5️⃣ Asynchronous (Non-Blocking)

* Code wait nahi karta.
* Task background me execute hota hai.
* Callback / Promise / Async-Await ka use hota hai.
* Error aur result callback me milta hai.

### Example:

```js
fs.readFile("demo.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log(data);
  }
});
```

👉 Program aage ka code execute karta rahega bina wait kiye.

---

# 🧵 6️⃣ Blocking vs Non-Blocking (Clear Concept)

### 🔹 Blocking

* Thread ruk jata hai
* Ek time me ek hi task
* Performance slow ho sakti hai

### 🔹 Non-Blocking

* Thread free rehta hai
* Multiple tasks handle kar sakta hai
* High performance server ke liye better

👉 Node.js asynchronous model use karta hai high performance ke liye.

---

# 🧠 7️⃣ Thread Pool in Node.js

Node.js internally **libuv** library use karta hai.

### 🔹 Default Thread Pool Size:

```
4
```

Matlab by default 4 threads available hote hain async tasks ke liye.

---

## 🔹 Can We Increase Thread Pool Size?

Haan, environment variable se increase kar sakte hain:

```
UV_THREADPOOL_SIZE=8
```

---

## 🔹 Max Thread Pool Size?

❗ Important Correction:

Thread pool size CPU cores ke equal automatically nahi hota.

Example:

* 8-core CPU hone ka matlab ye nahi ki 8 thread pool hoga.
* Default hamesha 4 hota hai.
* Max theoretically 128 tak set kar sakte hain (practically need ke hisab se set karte hain).

---

# 🔥 8️⃣ Important Interview Concepts

* Node.js single-threaded hota hai (Main thread)
* Async operations thread pool me jate hain
* Sync operations main thread ko block karte hain
* Heavy sync code performance ko slow karta hai

---

# 📌 Quick Revision Summary

* `fs` = File System module
* `writeFileSync()` = Blocking file create/write
* `writeFile()` = Non-blocking version
* Sync = Blocking
* Async = Non-blocking
* Async me callback(err, result) milta hai
* Default Thread Pool Size = 4
* libuv thread pool use hota hai

---



---

# 🌐 Node.js – Creating HTTP Server

---

# 📦 1️⃣ Required Modules

```js
const http = require("http");
const fs = require("fs");
```

## 🔹 http module

* Built-in module
* Server create karne ke liye use hota hai

## 🔹 fs module

* File System handle karne ke liye
* Yaha logging ke liye use ho raha hai

---

# 🏗 2️⃣ Creating Server

```js
const myServer = http.createServer((req, res) => {
   // request handler
});
```

## 🔹 createServer() kya karta hai?

* Ek HTTP server create karta hai
* Callback function har request par run hota hai
* Callback ke 2 parameters hote hain:

| Parameter | Meaning                           |
| --------- | --------------------------------- |
| req       | Client ki request ka data         |
| res       | Client ko response bhejne ke liye |

---

# 📥 3️⃣ Request Logging (Important Concept)

```js
const log = `${Date.now()}: ${req.url} New Req Received\n`

fs.appendFile("log.txt", log, (err) => {
   // response handling
});
```

## 🔹 appendFile()

* File me data add karta hai
* Async function hai (non-blocking)
* Agar file exist nahi karti → create kar deta hai

👉 Yaha har request ka:

* Timestamp
* URL
  log.txt me store ho raha hai

---

# 🔀 4️⃣ Routing using req.url

```js
switch(req.url) {
    case '/':
        res.end("Home Page");
        break;

    case '/about':
        res.end("I am Alok Kumar");
        break;

    default:
        res.end("404 not found");
}
```

## 🔹 req.url kya hai?

* Client ne jo route hit kiya hai
* Example:

  * `http://localhost:8000/` → `/`
  * `http://localhost:8000/about` → `/about`

---

# 📤 5️⃣ Sending Response

```js
res.end("Home Page");
```

* Response send karta hai
* Connection close karta hai
* Har request me ek hi baar call hona chahiye

---

# 🚀 6️⃣ Starting Server

```js
myServer.listen(8000, () => {
    console.log("Server Started!");
});
```

## 🔹 listen()

* Server ko specific port par start karta hai
* Yaha port number: **8000**
* Browser me open karne ke liye:

  ```
  http://localhost:8000
  ```

---

# 🧠 7️⃣ Flow of HTTP Server

```
Client Request → Server Receive → Log Save → Route Check → Response Send
```

---

# ⚡ 8️⃣ Important Concepts (Interview Focus)

### ✅ Node.js is single-threaded

* Multiple requests ko event loop handle karta hai

### ✅ appendFile is async

* Server block nahi hota
* High performance possible

### ✅ Routing manually ho raha hai

* Ye basic routing hai
* Production me Express.js use hota hai

---

# 🔥 9️⃣ Improved Version (Best Practice)

Thoda improve version (error handling add karke):

```js
const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Received\n`;

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            res.statusCode = 500;
            return res.end("Internal Server Error");
        }

        switch(req.url) {
            case '/':
                res.end("Home Page");
                break;

            case '/about':
                res.end("I am Alok Kumar");
                break;

            default:
                res.statusCode = 404;
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => {
    console.log("Server Started on Port 8000");
});
```

---

# 📌 Quick Revision Summary

* `http.createServer()` → server create karta hai
* `req` → client request data
* `res` → client response bhejne ke liye
* `req.url` → route check karne ke liye
* `res.end()` → response send + close connection
* `listen(port)` → server start
* `fs.appendFile()` → logging (async)

---

# 🔥 Tum Ab Yaha Tak Cover Kar Chuke Ho:

✔ Runtime
✔ Modules
✔ FS module
✔ Sync vs Async
✔ Thread Pool
✔ HTTP Server
✔ Basic Routing

---


---

# 🌐 Handling URLs in Node.js

---

# 🧩 1️⃣ Structure of a URL

Example URL:

```
https://www.mauryaalok.dev/
```

### 🔹 Breakdown:

| Part                 | Meaning     |
| -------------------- | ----------- |
| `https://`           | Protocol    |
| `www.mauryaalok.dev` | Domain Name |
| `/`                  | Path        |

---

## 🔐 Protocol

```
https://
```

* Stands for **HyperText Transfer Protocol Secure**
* Client (browser) aur server ke beech secure communication karta hai

---

## 🌍 Domain

```
www.mauryaalok.dev
```

* User-friendly name of server
* Ye actual IP address ko represent karta hai
* DNS domain ko IP me convert karta hai

---

## 📁 Path & Nested Path

```
/
```

Examples:

```
/about
/search
/products/mobile
```

* Path server ko batata hai ki kaunsa resource access karna hai

---

# ❓ 2️⃣ Query Parameters

Query parameters `?` ke baad start hote hain.

Example:

```
/about?myname=Alok
```

Structure:

```
?key=value
```

Multiple parameters:

```
/search?search_query=nodejs&category=backend
```

* `?` → start of query
* `&` → separate multiple parameters

---

# 🏗 3️⃣ Required Modules

```js
const http = require("http");
const fs = require("fs");
const url = require("url");
```

## 🔹 url module

* URL ko parse karne ke liye
* Query parameters access karne ke liye

---

# 🔍 4️⃣ Parsing URL

```js
const myUrl = url.parse(req.url, true);
```

### 🔹 Important:

* `true` pass karne se query parameters object form me milte hain

Example Output:

```js
{
  pathname: '/about',
  query: { myname: 'Alok' }
}
```

---

# 📌 5️⃣ Accessing Pathname & Query

```js
myUrl.pathname   // Route ke liye
myUrl.query      // Query parameters ke liye
```

---

# 🛠 6️⃣ Your Server Code (Structured Version)

```js
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {

    // Ignore favicon request
    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()}: ${req.url} New Req Received\n`;

    const myUrl = url.parse(req.url, true);

    fs.appendFile("log.txt", log, (err) => {

        switch (myUrl.pathname) {

            case '/':
                res.end("Home Page");
                break;

            case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;

            case '/search':
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                break;

            default:
                res.statusCode = 404;
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => {
    console.log("Server Started on Port 8000");
});
```

---

# 🧠 7️⃣ Important Concepts

### ✅ Why Ignore `/favicon.ico`?

Browser automatically favicon request bhejta hai.
Isliye unnecessary logging avoid karne ke liye ignore kiya.

---

### ✅ pathname vs query

| Property | Use                                   |
| -------- | ------------------------------------- |
| pathname | Route match karne ke liye             |
| query    | Query parameters access karne ke liye |

---

# 🔄 8️⃣ Flow of URL Handling

```
Client Request
     ↓
req.url receive
     ↓
url.parse()
     ↓
pathname check
     ↓
query read
     ↓
response send
```

---

# 🚀 9️⃣ Modern Way (Recommended)

`url.parse()` old approach hai.
Modern Node.js me `URL` class use karte hain:

```js
const myUrl = new URL(req.url, `http://${req.headers.host}`);

console.log(myUrl.pathname);
console.log(myUrl.searchParams.get("myname"));
```

👉 Ye zyada clean & future-proof approach hai.

---

# 📌 Quick Revision Summary

* URL = Protocol + Domain + Path + Query
* `?` → Query start
* `&` → Multiple params
* `url.parse(req.url, true)` → URL object
* `pathname` → route
* `query` → parameters
* Favicon request ignore kar sakte hain

---

---

# 🌐 HTTP Methods in Node.js

---

# 🧩 1️⃣ What are HTTP Methods?

HTTP Methods batate hain ki client server se **kya action perform karna chahta hai**.

Browser by default **GET request** bhejta hai.

---

# 📌 2️⃣ Types of HTTP Methods

| Method | Use                                           |
| ------ | --------------------------------------------- |
| GET    | Server se data lena                           |
| POST   | Server me data bhejna / create karna          |
| PUT    | Existing resource ko completely replace karna |
| PATCH  | Existing resource ka kuch part update karna   |
| DELETE | Data delete karna                             |

---

## 🔹 GET

* Data fetch karne ke liye
* URL me data send hota hai (query params)
* Safe & idempotent

Example:

```
/search?search_query=node
```

---

## 🔹 POST

* Server me new data create karne ke liye
* Data body me bheja jata hai
* Mostly forms & APIs me use hota hai

---

## 🔹 PUT (Correction)

❌ Sirf upload nahi hota
✔ Existing resource ko completely replace karta hai

Example:
User ka pura data update karna

---

## 🔹 PATCH

* Existing data ka kuch specific part update karta hai

Example:
Sirf email update karna

---

## 🔹 DELETE

* Resource ko remove karta hai

---

# 🏗 3️⃣ Your Server Code (Structured + Improved)

```js
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {

    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile("log.txt", log, (err) => {

        switch (myUrl.pathname) {

            case '/':
                if (req.method === "GET") {
                    res.end("Home Page");
                } else {
                    res.statusCode = 405;
                    res.end("Method Not Allowed");
                }
                break;

            case '/about':
                if (req.method === "GET") {
                    const username = myUrl.query.myname;
                    res.end(`Hi, ${username}`);
                }
                break;

            case '/search':
                if (req.method === "GET") {
                    const search = myUrl.query.search_query;
                    res.end("Here are your results for " + search);
                }
                break;

            case '/signup':
                if (req.method === "GET") {
                    res.end("This is a signup form");
                } 
                else if (req.method === "POST") {
                    // Database query yaha hoga
                    res.end("Signup Successful");
                }
                break;

            default:
                res.statusCode = 404;
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => {
    console.log("Server Started on Port 8000");
});
```

---

# 🧠 4️⃣ Important Concepts

## 🔹 req.method

* Client ne kaunsa HTTP method use kiya
* Example:

  * GET
  * POST
  * PUT
  * PATCH
  * DELETE

---

## 🔹 Status Codes (Very Important)

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 404  | Not Found             |
| 405  | Method Not Allowed    |
| 500  | Internal Server Error |

---

# 🔄 5️⃣ Flow of HTTP Method Handling

```
Client Request
     ↓
Check req.method
     ↓
Check pathname
     ↓
Perform Action
     ↓
Send Response
```

---

# 🔥 6️⃣ Real World Understanding

| Route    | Method | Meaning       |
| -------- | ------ | ------------- |
| /users   | GET    | Get all users |
| /users   | POST   | Create user   |
| /users/1 | PUT    | Replace user  |
| /users/1 | PATCH  | Update user   |
| /users/1 | DELETE | Delete user   |

---

# 🚀 7️⃣ Important Interview Notes

* GET → data read

* POST → data create

* PUT → full update

* PATCH → partial update

* DELETE → remove

* HTTP methods REST API ka base concept hai

* Method check karna important hai security ke liye

---

# 📌 Quick Revision Summary

* `req.method` → HTTP method batata hai
* GET default browser method hai
* POST data send karta hai
* PUT full update
* PATCH partial update
* DELETE remove karta hai
* Proper status codes use karna chahiye

---

# 🔥 Tum Ab Backend Core Samajh Rahe Ho:

✔ HTTP Server
✔ Routing
✔ URL Handling
✔ Query Params
✔ HTTP Methods
✔ Logging

---
