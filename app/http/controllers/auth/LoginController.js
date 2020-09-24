var passport = require("passport");
const { body } = require("express-validator/check");

class LoginController {
  async show(req, res) {
    res.render("pages/auth/login", { title: "Login" });
  }

  async login(req, res, next) {
    await validator(req, res, [
      body("username").trim().isString(),
      body("password").trim().isLength({ min: 6, max: 25 })
    ]);

    passport.authenticate("local", {
      successRedirect: "/dashboard",
      successFlash: "Welcome to your dashboard!",
      failureRedirect: "/auth/login",
      failureFlash: "Sorry! Invalid username or password",
    })(req, res, next);
  }

  async logout(req, res) {
    req.logOut();
    req.flash("info", "Bye! Thanks for logging in");
    res.redirect("/auth/login");
  }
}

module.exports = new LoginController();
