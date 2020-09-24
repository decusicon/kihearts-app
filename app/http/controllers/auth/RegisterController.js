let User = require("@models/user");
const { body } = require("express-validator/check");

// var _ = require("lodash");

class RegisterController {
  static async show(req, res) {
    req.session.customErrors = null;
    res.locals.customErrors = null;

    // errors.has()

    return res.render("pages/auth/register", { title: "Register" });
  }

  static async register(req, res, next) {
    try {

      await validator(req, res, [
        body("username").trim().isString(),
        // check for user's errors
        body("firstname").trim(),
        body("lastname").trim(),
        body("nickname").trim(),
        body("email").trim().isEmail(),
        body("phoneNumber").trim().isInt(),
        body("password").trim().isLength({ min: 6 }),
        body("re_password").trim().equals(password),
        body("country").trim(),
        body("state").trim(),
        body("city").trim(),
        body("postalcode").trim().isPostalCode("any").optional(),
        body("homeAddress").trim(),
        // check for next of kin's error
        body("next_firstname").trim(),
        body("next_lastname").trim(),
        body("next_relationship").trim(),
        body("next_email").trim().isEmail(),
        body("next_phoneNumber").trim().isInt(),
        body("next_country").trim(),
        body("next_state").trim(),
        body("next_city").trim(),
        body("next_postalcode").isPostalCode("any").optional(),
        body("next_homeAddress").trim(),
      ]);

      const userObj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        postalcode: req.body.postalcode,
        homeAddress: req.body.homeAddress,
        nextOfKin: {
          firstname: req.body.next_firstname,
          lastname: req.body.next_lastname,
          relationship: req.body.next_relationship,
          email: req.body.next_email,
          phoneNumber: req.body.next_phoneNumber,
          country: req.body.next_country,
          state: req.body.next_state,
          city: req.body.next_city,
          postalcode: req.body.next_postalcode,
          homeAddress: req.body.next_homeAddress,
        },
	  };
	  

      var user = new User(userObj);

      await user.save();

      req.flash("success", `Success! You're now registered.`);
      res.redirect("/auth/login");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RegisterController;
