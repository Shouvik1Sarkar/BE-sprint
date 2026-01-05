import fs from "fs";
function add_file(filename) {
  return (req, res, next) => {
    fs.appendFile(filename, `${req.path} \n`, () => {
      next();
    });
  };
}
export { add_file };
