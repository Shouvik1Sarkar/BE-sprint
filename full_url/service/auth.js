import jwt from "jsonwebtoken";
const secret = "abc324RTYj%^2";
function setUser(user) {
  return jwt.sign({ _id: user._id, email: user.email }, secret);
}
function getUser(token) {
  if (!token) return null; // why?
  return jwt.verify(token, secret);
}
export { setUser, getUser };
