import mongoose, { Types } from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },

  clickHistory: [
    {
      timeStamp: {
        type: Number,
      },
    },
  ],
});
const Url = mongoose.model("Url", urlSchema);
export default Url;
