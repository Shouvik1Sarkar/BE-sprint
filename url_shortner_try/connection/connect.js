import mongoose from "mongoose";

async function connectUrl(url) {
  return await mongoose.connect(url);
}
export default connectUrl;
