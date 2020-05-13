var express = require("express");
var path = require("path");
var fs = require("fs");
var router = express.Router();
var bcrypt = require("bcryptjs");
var multer = require("multer");

// MULTER
// Upload middleware
// This creates the storage for saving the file on disk.
var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Creates the directory for the avatar photos
      const createMultipleDir = (loc) => {
        var locArr = loc.split("/");
        console.log("loc: ", loc);

        // Check is loc is a directory
        // If false create dirs else return loc
        fs.stat("public/temp/avatar", (err, stats) => {
          if (err) console.log(err);

          console.log("stats: ", stats);

          fs.readdir(loc, (err, files) => {
            if (err) console.log(err);
            console.log("files: ", files);
          });
        });
        return loc;
      };

      cb(
        null,
        "public/temp/"
        // createMultipleDir(
        //   `public/temp/${req.user ? req.user._id : ""}/${file.fieldname}`
        // )
      );
    },
    filename: (req, file, cb) => {
      const uniqueFilename = `${req.user ? req.user.nickname : ""}_${
        file.fieldname
      }-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    },
  }),
});

// MODELS
var User = require("../models/user");

// GET -- fetch page.
router.get("/", (req, res) => {
  res.render("pages/myaccount", { title: "My Account" });
});

// POST -- edit user's avatar
router.post("/edit/:id/avatar", upload.single("avatar"), (req, res) => {
  const avatar = `${process.env.APP_URL}${req.file.path.split("public")[1]}`;

  var update = { avatar };

  var query = { _id: req.params.id };
  User.updateOne(query, update, (err) => {
    if (err) console.log(err);
    req.flash("success", "Success! You've just changed your profile photo.");
    res.redirect("/myaccount");
  });
});

// POST -- edit user's info
router.post("/edit/:id/info", (req, res) => {
  const {
    firstname,
    lastname,
    nickname,
    email,
    phoneNumber,
  } = global.gatherBodyVariables(req);

  var update = {
    firstname,
    lastname,
    nickname,
    email,
    phoneNumber,
  };

  var query = { _id: req.params.id };
  User.updateOne(query, update, (err) => {
    if (err) console.log(err);
    req.flash("success", "Success! You've just updated your account.");
    res.redirect("/myaccount");
  });
});

// POST -- edit user's details
router.post("/edit/:id/details", (req, res) => {
  const {
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

  var update = {
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
  };

  var query = { _id: req.params.id };
  User.updateOne(query, update, (err) => {
    if (err) console.log(err);
    req.flash("success", "Success! You've just updated your account.");
    res.redirect("/myaccount");
  });
});

// POST -- edit user's info
router.post("/edit/:id/changePassword", (req, res) => {
  const { password } = global.gatherBodyVariables(req);
  var current_password = req.body.current_password;

  var query = { _id: req.params.id };
  User.findOne(query, (err, user) => {
    if (err) console.log(err);

    // This method concludes all the changepassword process
    const done = (err, user, result = {}) => {
      if (user != null) {
        if (password == req.body.re_password) {
          // Hash password before updating
          bcrypt.genSalt(10, (err, salt) => {
            if (err) console.log(err);
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) console.log(err);

              var update = { password: hash };
              User.updateOne(query, update, (err) => {
                if (err) console.log(err);
                req.flash(
                  "success",
                  "Success! You've just updated your password."
                );
                res.redirect("/myaccount");
              });
            });
          });
        } else {
          req.flash("error", "Error! Wrong password, try again.");
          res.redirect("/myaccount");
        }
      } else {
        req.flash(result.type, result.message);
        res.redirect("/myaccount");
      }
    };

    // match old password with existing password from db
    bcrypt.compare(current_password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch)
        done(null, null, {
          type: "error",
          message: "Error! Wrong password, try again.",
        });
      else done(null, user);
    });
  });
});

module.exports = router;
