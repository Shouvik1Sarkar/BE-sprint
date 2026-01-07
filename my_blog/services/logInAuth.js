import jwt from "jsonwebtoken";
const secret = "shhhh";

function setUser(user) {
  console.log("usr====+++++", user);
  const pay_load = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
  };
  const cookie_token = jwt.sign(pay_load, secret);
  return cookie_token;
}
function getUser(token) {
  if (!token) {
    return;
  }
  const user = jwt.verify(token, secret);
  console.log("LLLLLLL: ", user);
  return user;
}
export { setUser, getUser };
