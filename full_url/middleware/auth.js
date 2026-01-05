import { getUser } from "../service/auth.js";

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log("USERIS: ", userUid);
  if (!userUid) {
    console.log("This one is triggered-----1");
    return res.redirect("/login");
  }
  console.log("USER:====");
  const user = getUser(userUid);
  console.log("USER: ", user);
  if (!user) {
    console.log("This one is triggered-----2");
    return res.redirect("/login");
  }
  req.user = user;

  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;

  next();
}
export { restrictToLoggedInUserOnly, checkAuth };
