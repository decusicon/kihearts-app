var bcrypt = require("bcryptjs");
const Model = require('@schemas/UserSchema').model;

class User extends Model {

	// //-- GetUserById
	// static getUserById(id, callback) {
	// 	this.findById(id, callback);
	// };

	// //-- GetUserByIdandUpdate
	// static getUserByIdandUpdate(id, update, callback) {
	// 	this.findByIdAndUpdate(id, update, {
	// 		useFindAndModify: false
	// 	}, callback);
	// };

	// //-- GetUserByUsername
	// static getUserByUsername(username, callback) {
	// 	let query = {
	// 		username: username
	// 	};
	// 	this.findOne(query, callback);
	// };

	//-- ComparePassword
	async comparePassword(password, hash) {
		return await bcrypt.compare(password, hash);
	}

	async passwordCheck(password) {
		return await bcrypt.compare(password, this.password);
	}

	set avatar(value) {
		super.avatar = value;
	}

	get avatar() {
		if (this.hasAvatar) {
			return `/storage/profile-photos/${super.avatar}`;
		}
		return `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${this.firstname} ${this.lastname}`;
	}

	get hasAvatar() {
		return !_.isEmpty(super.avatar);
	}
};

module.exports = User;
