import { response } from "express";
import Url from "../models/url.models.js";
import shortid from "shortid";

function handleHomepage(req, res) {
  // res.send("Home Route");
  return res.render("home");
}
async function handleCreateRoute(req, res) {
  const originalUrl = req.body.original_url;
  console.log("Original: ", originalUrl);
  if (!originalUrl) {
    return res.status(501).json({ msg: "Enter an URL." });
  }
  const shortId = shortid.generate();
  if (!shortId) {
    return res.status(501).json({ msg: "ShortId not created" });
  }

  const url_db = await Url.create({
    shortId,
    redirectUrl: originalUrl,
    viewHistory: [],
  });

  return res.render("home", { shortId });

  // return res
  //   .status(201)
  //   .json({ url_data: `http://localhost:8000/url/${shortId} ` });
}
async function handleRedirect(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(501).json({ msg: "URL not found." });
  }

  const myUrl = await Url.findOneAndUpdate(
    { shortId: id },
    {
      $push: { viewHistory: { timeStamp: Date.now() } },
    }
  );
  console.log("SHORTID: ", id);
  console.log("MYURL: ", myUrl);
  if (!myUrl) {
    return res.status(501).json({ msg: "URL not found.-----------" });
  }
  return res.redirect(myUrl.redirectUrl);
}
async function handleStatsRoute(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(501).json({ msg: "URL not found." });
  }
  const myUrl = await Url.findOne({ shortId: id });
  if (!myUrl) {
    return res.status(501).json({ msg: "URL not found.-----------" });
  }

  return res
    .status(201)
    .json({ views: myUrl.viewHistory.length, history: myUrl.viewHistory });
}

export { handleHomepage, handleCreateRoute, handleRedirect, handleStatsRoute };
