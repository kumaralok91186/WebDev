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
