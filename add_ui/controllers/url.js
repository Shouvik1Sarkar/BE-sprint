import shortid from "shortid";
import Url from "../models/url.js";
async function handleHomeRoute(req, res) {
  res.send("this is i");
}
async function handleCreateUrl(req, res) {
  const redirectUrls = req.body.shortId;
  if (!redirectUrls) {
    return res.status(501).json({ msg: "Enter a URL" });
  }

  const result = shortid.generate();

  await Url.create({
    shortId: result,
    redirectUrl: redirectUrls,
    clickHistory: [],
  });

  console.log("shortid: ", result);
  return res.render("home", { id: result });

  // return res.status(200).json({ r: result });
}

async function handleclickUrl(req, res) {
  const shortId = req.params.id;

  if (!shortId) {
    return res.status(501).json({ msg: "Error mo id" });
  }

  const data = await Url.findOneAndUpdate(
    { shortId },
    { $push: { clickHistory: { timeStamp: Date.now() } } }
  );

  if (!data) {
    return res.status(501).json({ msg: "Error URL not found" });
  }

  console.log(data.redirectUrl);

  res.redirect(data.redirectUrl);

  //   return res.status(201).json({ msg: "Done" });
}

async function handleViews(req, res) {
  const stat_id = req.params.id;
  if (!stat_id) {
    return res.status(501).json({ msg: "no id" });
  }

  const urls = await Url.findOne({ shortId: stat_id });

  if (!urls) {
    return res.status(501).json({ msg: "no url found" });
  }
  const length = urls.clickHistory.length;

  return res.render("home", { clicks: length, times: urls.clickHistory });

  // return res.status(201).json({
  //   msg: {
  //     clicks: length,
  //     times: urls.clickHistory,
  //   },
  // });
}

export { handleCreateUrl, handleclickUrl, handleViews, handleHomeRoute };
