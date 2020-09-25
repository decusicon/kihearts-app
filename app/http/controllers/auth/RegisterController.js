const User = require("@models/user");
const Joi = require('joi');
const path = require('path')
const cryptoRandomString = require('crypto-random-string');

class RegisterController {
	async show(req, res) {

		return res.render("pages/auth/register", { title: "Register" });
	}

	async register(req, res, next) {
		req.flash("error", `User already registered`);
		console.log(req.body);
		try {
			const validationSchema = Joi.object({
				firstname: Joi.string().trim().required(),
				lastname: Joi.string().trim().required(),
				nickname: Joi.string().trim().required(),
				email: Joi.string().trim().email().required(),
				phoneNumber: Joi.number().integer().required(),
				password: Joi.string().trim().required().min(6),
				re_password: Joi.ref('password'),
				country: Joi.string().trim().required(),
				state: Joi.string().trim().required(),
				city: Joi.string().trim().required(),
				postalcode: Joi.string().trim().optional(),
				homeAddress: Joi.string().trim().required(),
				// check for next of kin's error
				next_firstname: Joi.string().trim().required(),
				next_lastname: Joi.string().trim().required(),
				next_relationship: Joi.string().trim().required(),
				next_email: Joi.string().trim().email().required(),
				next_phoneNumber: Joi.number().integer().required(),
				next_country: Joi.string().trim().required(),
				next_state: Joi.string().trim().required(),
				next_city: Joi.string().trim().required(),
				next_postalcode: Joi.string().trim().optional(),
				next_homeAddress: Joi.string().trim().required(),
			});

			const valid = await validator(req.body, validationSchema);

			const userExist = User.find({
				$or: [
					{ email: valid.email },
					{ nickname: valid.nickname },
					{ phoneNumber: valid.phoneNumber },
				],
			});

			if(userExist) {
				req.flash("error", `User already registered`);
				return res.redirect("/auth/register");
			}

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
