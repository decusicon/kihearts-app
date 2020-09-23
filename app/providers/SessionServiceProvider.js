let session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

class SessionServiceProvider {
  static handle(app) {
    app.set("trust proxy", 1); // trust first proxy

    let sess = {
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      secret: config("app", "key"),
      resave: true,
      saveUninitialized: true,
      cookie: { secure: true },
    };

    if (config("app", "env") === "production") {
      app.set("trust proxy", 1); // trust first proxy
      sess.cookie.secure = true; // serve secure cookies
    }

    app.use(session(sess));
  }
}

module.exports = SessionServiceProvider;
