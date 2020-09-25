let session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

class SessionServiceProvider {
  static handle(app) {

    let sess = {
		// store: new MongoStore({ mongooseConnection: mongoose.connection }),
		secret: config("app", "key"),
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	};

    if (config("app", "env") === "production") {
      app.set("trust proxy", 1); // trust first proxy
      sess.cookie.secure = true; // serve secure cookies
    }

    app.use(session(sess));
  }
}

module.exports = SessionServiceProvider;
