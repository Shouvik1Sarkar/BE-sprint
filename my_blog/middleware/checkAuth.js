import { getUser } from "../services/logInAuth.js";

function checkAuthentication(token_name) {
  console.log("YYYYYYYYY", token_name);
  return (req, res, next) => {
    console.log("ttttttttttttttt");
    console.log(req.cookies);
    const tokenCookiesValue = req.cookies[token_name];
    console.log("ttttttttttttttt", tokenCookiesValue);
    if (!tokenCookiesValue) {
      return next();
    }
    try {
      const payload = getUser(tokenCookiesValue);
      console.log("PAYLOAD: ", payload);
      req.user = payload;
    } catch (error) {}
    return next();
  };
}

export { checkAuthentication };
