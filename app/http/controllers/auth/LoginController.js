var passport = require("passport");

class LoginController {
  async show(req, res) {
    res.render("pages/auth/login", { title: "Login" });
  }

  async login(req, res, next) {
    try {
      const valid = await req.validate({
        username: "required|string|min:3|email",
        password: "required|string|min:6",
      });

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
