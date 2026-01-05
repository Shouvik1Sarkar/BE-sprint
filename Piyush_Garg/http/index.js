import http from "http";
import fs from "fs";
import url from "url";
// console.log(http); // a big ass object

const my_Server = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") return;
  const log = `${Date.now()}: ${req.method} ${req.url} request accepted\n`;
  const myUrl = url.parse(req.url, true);
  //   console.log(myUrl);
  fs.appendFile("record.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home");
        break;
      case "/about":
        const userName = myUrl.query.myname;
        // console.log(myUrl.query.myname);
        res.end(`I am THEEEEEEEEEEEE ${userName}`);
        break;
      case "/search":
        console.log(myUrl);
        const search_result = myUrl.query.search_query;
        res.end(`Here is the result for ${search_result}`);
        break;
      default:
        res.end("404 NOT FOUND");
    }
  });
  //   console.log("REq", req);
});

my_Server.listen(8000, () => {
  console.log("Successfully done.");
});
