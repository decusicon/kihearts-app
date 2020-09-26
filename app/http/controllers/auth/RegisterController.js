const User = require("@models/user");
const path = require('path')
const cryptoRandomString = require('crypto-random-string');

class RegisterController {
	async show(req, res) {

		return res.render("pages/auth/register", { title: "Register" });
	}

	async register(req, res, next) {
		try {
			const valid = await req.validate({
				firstname: "required|string",
				lastname: "required|string",
				nickname: "required|string|unique:users,nickname",
				email: "required|string|min:3|email|unique:users,email",
				phoneNumber: "required|string|unique:users,phoneNumber",
				password: "required|string|min:6|confirmed",
				country: "required|string",
				state: "required|string",
				city: "required|string",
				postalcode: "present|string",
				homeAddress: "required|string",
				// check for next of kin's error
				next_firstname: "required|string",
				next_lastname: "required|string",
				next_relationship: "required|string",
				next_email: "required|string|min:3|email",
				next_phoneNumber: "required|string",
				next_country: "required|string",
				next_state: "required|string",
				next_city: "required|string",
				next_postalcode: "present|string",
				next_homeAddress: "required|string",
			});

			const userObj = {
				firstname: valid.firstname,
				lastname: valid.lastname,
				nickname: valid.nickname,
				email: valid.email,
				phoneNumber: valid.phoneNumber,
				password: valid.password,
				country: valid.country,
				state: valid.state,
				city: valid.city,
				postalcode: valid.postalcode,
				homeAddress: valid.homeAddress,
				nextOfKin: {
					firstname: valid.next_firstname,
					lastname: valid.next_lastname,
					relationship: valid.next_relationship,
					email: valid.next_email,
					phoneNumber: valid.next_phoneNumber,
					country: valid.next_country,
					state: valid.next_state,
					city: valid.next_city,
					postalcode: valid.next_postalcode,
					homeAddress: valid.next_homeAddress,
				},
			};

			var user = new User(userObj);

			await user.save();

			req.flash("success", `Success! You're now registered.`);
			res.redirect("/auth/login");
		} catch (error) {
			next(error);
		}
	}

	async showAvatar(req, res, next) {
		return res.render("pages/auth/complete-registration-avatar", {
            title: "Upload a Photo",
        });
	}

	async uploadAvatar(req, res, next) {

		try {
			const user = req.user;

			if (!req.files.avatar) {
				return res.redirect('/auth/register/complete/avatar');
			}

			let avatar = req.files.avatar;

			const fileName = cryptoRandomString({ length: 64, type: 'url-safe' }) + path.extname(avatar.name);

			avatar.mv(`${storage_path('app/public/profile-photos')}/${fileName}`);

			user.avatar = fileName;

			await user.save();

			return res.redirect('/dashboard');
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new RegisterController();
