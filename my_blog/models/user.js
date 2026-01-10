import mongoose from "mongoose";

import { createHmac, randomBytes } from "node:crypto";
import { setUser } from "../services/logInAuth.js";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  profileImage: {
    type: String,
    enum: [],
  },
});

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedpassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");
  this.password = hashedpassword;
  this.salt = salt;
});

userSchema.static("matchPassword", async function (email, password) {
  console.log("EMAIL MATCH PASS: ", email);
  console.log("EMAIL MATCH PASS: ", password);
  const user = await this.findOne({ email });
  if (!user) {
    return new Error("Incorrect email");
  }

  const salt = user.salt;

  const userProvidedHashedpassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (userProvidedHashedpassword == user.password) {
    // return { ...user, password: undefined, salt: undefined };
    return setUser(user);
  } else {
    throw new Error("Incorrect password");
  }
});

const User = mongoose.model("User", userSchema);

export default User;
