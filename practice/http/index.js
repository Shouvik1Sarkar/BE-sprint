import fs from "fs";
import url from "url";
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") {
    return;
  }
  const myUrl = url.parse(req.url, true);
  console.log("MYURL: ", myUrl);
  const log = `${Date.now()}: ${myUrl.pathname}  ${req.url} \n`;
  fs.appendFile("record.txt", log, () => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home Page");
        break;

      case "/about":
        res.end(`Hi My name is ${myUrl.query.myname}`);
        break;
      case "/search":
        res.end(`Here is the search result for ${myUrl.query.search_for}`);
        break;
      default:
        res.end("404 Not Found");
    }
  });
});

server.listen(3000, () => {
  console.log("All set");
});
