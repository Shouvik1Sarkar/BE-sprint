import mongoose from "mongoose";

async function connectdb(url) {
  mongoose.connect(url);
}

export default connectdb;
