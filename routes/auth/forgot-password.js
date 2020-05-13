var express = require("express");
var router = express.Router();

// GET -- fetch page.
router.get("/", (req, res) => {
  res.render("pages/auth/forgot-password", { title: "Forgot Password" });
});

module.exports = router;
