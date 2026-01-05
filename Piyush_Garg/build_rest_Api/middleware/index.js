import fs from "fs";

function logResRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n ${Date.now()}: ${req.ip}: ${req.method}: ${req.path}
    \n`,
      () => {
        next();
      }
    );
  };
}
export { logResRes };
