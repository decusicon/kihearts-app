var express = require("express");
var router = express.Router();

// GET -- home page.

router.get("/", (req, res) => {
  res.render("pages/dashboard", {
    title: "Dashboard",
  });
  // }
});

module.exports = router;
