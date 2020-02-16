const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "R3XT3R - The Discord Bot",
    user: req.session.user || null
  });
  console.log(Date.now() + " Ping Received");
});

router.get("/commands", (req, res) => {
  fetch("https://r3xt3r.glitch.me/stats")
    .then(res => res.json())
    .then(json => {
      res.render("commands", {
        pageTitle: "R3XT3R - The Discord Bot",
        stats: json || null,
        user: req.session.user || null
      });
    });
});
router.get("/me", (req, res) => {
  res.render("me", {
    pageTitle: "R3XT3R - The Discord Bot",
    user: req.session.user || null
  });
});
router.get("/status", (req, res) => {
  fetch("https://r3xt3r.glitch.me/stats")
    .then(res => res.json())
    .then(json => {
      res.render("status", {
        pageTitle: "R3XT3R - The Discord Bot",
        stats: json || null,
        user: req.session.user || null
      });
    });
});

module.exports = router;
