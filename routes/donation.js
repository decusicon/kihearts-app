var express = require("express");
var router = express.Router();

// GET -- fetch page.
router.get("/", (req, res) => {
  res.render("pages/donation", { title: "Donation" });
});

module.exports = router;
