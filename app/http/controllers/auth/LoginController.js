var passport = require("passport");
const Joi = require('joi');

class LoginController {
  async show(req, res) {
    res.render("pages/auth/login", { title: "Login" });
  }

  async login(req, res, next) {
    try {
      const validationSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required()
      });

      await validator(req.body, validationSchema);

      passport.authenticate("local", {
        successRedirect: "/dashboard",
        successFlash: "Welcome to your dashboard!",
        failureRedirect: "/auth/login",
        failureFlash: "Sorry! Invalid username or password",
      })(req, res, next);

    } catch (error) {
      next(error);
    } 
  }

  async logout(req, res) {
    req.logOut();
    req.flash("info", "Bye! Thanks for logging in");
    res.redirect("/auth/login");
  }
}

module.exports = new LoginController();
