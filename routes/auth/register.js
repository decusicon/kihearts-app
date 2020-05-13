var express = require("express");
var bcrypt = require("bcryptjs");
var router = express.Router();

// MODELS
var User = require("../../models/user");

// ROUTES
// GET -- fetch page.
router.get("/", (req, res) => {
  res.render("pages/auth/register", { title: "Register" });
});

// POST -- Register user

router.post("/", (req, res) => {
  const avatar = `${process.env.APP_URL}/images/users/user.jpg`;
  const joined = Date.now();

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
  } = global.gatherBodyVariables(req);

  var regErrors = req.validationErrors();

  if (regErrors) {
    req.session.regErrors = regErrors;
    res.locals.regErrors = req.session.regErrors;
    console.log("RegErrors: ", res.locals.regErrors);
    console.log("Errors: ", regErrors);
    res.render("pages/auth/register", { title: "Register" });
  } else {
    req.session.regErrors = [];
    var newUser = new User({
      avatar,
      joined,
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
});

// EXPORTS
module.exports = router;