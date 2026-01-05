import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser, getUser } from "../service/auth.js";
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  //   return res.render("home");
  return res.redirect("/");
}
async function handleLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user) {
    // return res.redirect("/login?error=invalid"); // Pass error in query
    return res.render("login", {
      error: "Password or Email is wrong",
    });
  }

  console.log("this is payload user: ", user);
  const token = setUser(user);
  res.cookie("uid", token);
  //   return res.render("home"); // what if I used this
  return res.redirect("/"); // which / is this?
}
export { handleUserSignUp, handleLogIn };
