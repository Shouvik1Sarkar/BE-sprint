import mongoose from "mongoose";
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: true,
      require: true,
    },
    redirectUrl: {
      type: String,
      require: true,
    },
    viewHistory: [
      {
        timeStamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
