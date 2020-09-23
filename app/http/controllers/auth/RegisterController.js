let User = require("@models/user");

class RegisterController {
  static async show(req, res) {
    res.render("pages/auth/register", { title: "Register" });
  }

  static async register(req, res, next) {
    const {
      firstname,
      lastname,
      nickname,
      email,
      phoneNumber,
      password,
      country,
      state,
      city,
      postalcode,
      homeAddress,
      next_firstname,
      next_lastname,
      next_relationship,
      next_email,
      next_phoneNumber,
      next_country,
      next_state,
      next_city,
      next_postalcode,
      next_homeAddress,
    } = global.gatherUserBodyVariables(req);

    var regErrors = req.validationErrors();

    if (regErrors) {
      req.session.customErrors = regErrors;
      res.locals.customErrors = req.session.customErrors;
      res.render("pages/auth/register", { title: "Register" });
    } else {
      req.session.customErrors = [];
      var newUser = new User({
        firstname,
        lastname,
        nickname,
        email,
        phoneNumber,
        password,
        country,
        state,
        city,
        postalcode,
        homeAddress,
        nextOfKin: {
          firstname: next_firstname,
          lastname: next_lastname,
          relationship: next_relationship,
          email: next_email,
          phoneNumber: next_phoneNumber,
          country: next_country,
          state: next_state,
          city: next_city,
          postalcode: next_postalcode,
          homeAddress: next_homeAddress,
        },
      });

      // Save new user
      User.saveUser(newUser, (err) => {
        if (err) console.log(err);
        else {
          req.flash("success", `Success! You're now registered.`);
          res.redirect("/auth/login");
        }
      });
    }
  }
}

module.exports = RegisterController;
