var express = require("express");
var router = express.Router();

// GET -- fetch page.
router.get("/", (req, res) => {
  res.render("pages/wallet", { title: "Wallets" });
});

module.exports = router;
