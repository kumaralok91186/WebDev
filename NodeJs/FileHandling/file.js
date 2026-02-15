const fs = require("fs");
const os = require("os");

console.log(os.cpus().length);


// // Sync.. Blocking Request
// fs.writeFileSync('./test.txt', 'Hey There');


// // Async  Non-blocking request
// fs.writeFile('test.txt', "Hello World Async", (err) => {});


// const result = fs.readFileSync('./contacts.txt', "utf-8");
// console.log(result);



// fs.readFile('./contacts.txt', "utf-8", (err, result) => {
//     if(err) {
//         console.log("Error", err);
//     }
//     else {
//         console.log(result);
//     }
// });



// Append---

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
// fs.appendFileSync("./test.txt", `${Date.now()} Hey There\n`);


// fs.copyFileSync("./test.txt", "./copy.txt");

// fs.unlinkSync("./copy.txt");

// console.log(fs.statSync("./test.txt"));





// console.log("1");

// // Blocking..(thred are blocked, so there are sync return)
// const result = fs.readFileSync("contacts.txt", 'utf-8');
// console.log(result);

// console.log("2");



console.log("1");

// non-blocking.. (return Async)
fs.readFile("contacts.txt", 'utf-8', (err, result) => {
    if(err) {
        console.log("Error", err);
    }
    else {
        console.log(result);
    }
});

console.log("2");
console.log("3");
console.log("4");
console.log("5");