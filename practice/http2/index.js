import fs from "fs";
import url from "url";
import http from "http";

const myServer = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") return;

  const a = url.parse(req.url, true);
  //   console.log(a.query.my_name);

  console.log(a.pathname);
  fs.appendFile("record.txt", `${req.url}\n`, () => {});
  switch (a.pathname) {
    case "/":
      res.end("Home route.");
      break;
    case "/about":
      res.end(`Hi This is ${a.query.my_name} & ${a.query.id}`);
      break;
    case "/search":
      res.end(`Here is the search result for ${a.query.search_for}`);
      break;
    default:
      res.end("404 NOT FOUND");
      break;
  }
});

myServer.listen(4000, () => {
  console.log("This is running at port 4000");
});
