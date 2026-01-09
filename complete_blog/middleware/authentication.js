import { validateToken } from "../services/authentication.js";

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookiesValue = req.cookies[cookieName];
    if (!tokenCookiesValue) {
      return next();
    }
    try {
      const userPayLoad = validateToken(tokenCookiesValue);
      console.log("USERPAYLOADxxxxxxxxxxxxxxxxxxxxxxxxxx", userPayLoad);
      req.user = userPayLoad;
    } catch (error) {}
    return next();
  };
}
export { checkForAuthenticationCookie };
