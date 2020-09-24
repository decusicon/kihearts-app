let User = require("@models/user");
const Joi = require('joi');

class RegisterController {
	static async show(req, res) {

		return res.render("pages/auth/register", { title: "Register" });
	}

	static async register(req, res, next) {
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
}

module.exports = RegisterController;
