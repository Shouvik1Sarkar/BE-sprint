import mongoose from "mongoose";
function connect_db(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("DATABASE connected successfully");
    })
    .catch((err) => {
      console.log("ERROR CONNECTING: ", err);
    });
}
export default connect_db;
