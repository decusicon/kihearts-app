var express = require("express");
var router = express.Router();

// ROUTERS
var loginRouter = require("./auth/login");
var registerRouter = require("./auth/register");
var forgotPasswordRouter = require("./auth/forgot-password");

// GET -- logout.
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("info", "Bye! Thanks for logging in");
  res.redirect("/auth/login");
});

// ROUTES
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/forgot-password", forgotPasswordRouter);

module.exports = router;
