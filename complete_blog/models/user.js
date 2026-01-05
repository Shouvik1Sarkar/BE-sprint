import mongoose from "mongoose";
import { createHmac, randomBytes } from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: "/images/user_avatar.avif",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },

  { timestamps: true }
);

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  user.password = hashedPassword;
  user.salt = salt;
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect password");
  }
  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  console.log("HASHED: ", hashedPassword);
  console.log("USER HASHED: ", userProvidedHash);

  if (hashedPassword == userProvidedHash) {
    return { ...user, password: undefined, salt: undefined };
  } else {
    throw new Error("Incorrect password");
  }
});
const User = mongoose.model("User", userSchema);
export default User;
