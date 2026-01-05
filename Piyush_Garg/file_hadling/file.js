import fs from "fs";

//****************Write content in a file Synchronously****************//

// fs.writeFileSync("test.txt", "Hey this is Synchronous writing.");

//****************Write content in a file Asynchronously****************//

// fs.writeFile("test.txt", "Hey this is Asynchronous writing.", (err) => {});

//****************Read files Synchronously****************//

// const contact = fs.readFileSync("contacts.txt", "utf-8");
// console.log(contact);

//****************Read files Asynchronously****************//

// unlike synchronous it does not return the value. It passes to the cb

// fs.readFile("contacts.txt", "utf-8", (err, out) => {
//   if (err) {
//     console.error("ERROR: ", err);
//     return;
//   }
//   console.log("OutPut: \n", out);
// });

// ****************Append text to a file****************//

// fs.appendFileSync("test.txt", `\n ${new Date().getDate().toString()}`);

// ****************Copy text to a file****************//

// fs.cpSync("test.txt", "newText.txt");

// ****************Delete a file****************//

// fs.unlinkSync("newText.txt");

// ****************sats of a file****************//

// console.log(fs.statSync("test.txt"));

// ****************Make new directory****************//
// fs.mkdirSync("mydir");

// ****************Make new directory recursively****************//
fs.mkdirSync("mydirs/a/b", { recursive: true });
