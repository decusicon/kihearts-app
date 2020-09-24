var bcrypt = require("bcryptjs");
const Model = require('@schemas/UserSchema').model;

class User extends Model {

	//-- GetUserById
	static getUserById(id, callback) {
		this.findById(id, callback);
	};

	//-- GetUserByIdandUpdate
	static getUserByIdandUpdate(id, update, callback) {
		this.findByIdAndUpdate(id, update, {
			useFindAndModify: false
		}, callback);
	};

	//-- GetUserByUsername
	static getUserByUsername(username, callback) {
		let query = {
			username: username
		};
		this.findOne(query, callback);
	};

	//-- ComparePassword
	async comparePassword(password, hash) {
		return await bcrypt.compare(userPassword, hash);
	}

	get avatar() {
		return 'n/a'
	}
};

module.exports = User;
