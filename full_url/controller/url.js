import shortid from "shortid";
import Url from "../models/url.js";
import { render } from "ejs";

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body?.url) {
    return res.status(400).json({ msg: "URL is required" });
  }
  const shortID = shortid.generate();
  await Url.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortID });
  return res.json({ id: shortID });
}

async function handleredirectUrl(req, res) {
  const shortID = req.params.shortId;

  const entry = await Url.findOneAndUpdate(
    { shortId: shortID },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  return res.redirect(entry.redirectURL);
}

async function handleAnalyticsUrl(req, res) {
  const shortID = req.params.shortId;
  const result = await Url.findOne({ shortId: shortID });

  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

export { handleGenerateNewShortURL, handleredirectUrl, handleAnalyticsUrl };

const data = {
  meals: [],
}; // json object
