const bcrypt = require("bcryptjs");
const Model = require("@schemas/UserSchema").model;


class User extends Model {

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

	get name() {
		return `${super.firstname} ${super.lastname}`;
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
}

module.exports = User;
