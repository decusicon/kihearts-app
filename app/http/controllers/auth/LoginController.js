var passport = require("passport");

class LoginController {
  static async show(req, res) {
    res.render("pages/auth/login", { title: "Login" });
  }

  static async login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      successFlash: "Welcome to your dashboard!",
      failureRedirect: "/auth/login",
      failureFlash: "Sorry! Invalid username or password",
    })(req, res, next);
  }

  static async logout(req, res) {
    req.logOut();
    req.flash("info", "Bye! Thanks for logging in");
    res.redirect("/auth/login");
  }
}

module.exports = LoginController;
