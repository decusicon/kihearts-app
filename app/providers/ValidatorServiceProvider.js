const Validator = require("validatorjs");
const validationError = require("@app/exceptions/ValidationError");
const mongoose = require("mongoose");

class ValidatorServiceProvider {
	static async handle(app) {
		app.use(function (req, res, next) {
			req.validate = (rules, message = {}) => {
				return new Promise((resolve, reject) => {
					const validation = new Validator(req.body, rules, message);

					const handleFails = () => {
						const errorObj = new validationError(
							"The given data is invalid"
						);
						errorObj.setErrors(validation.errors);
						errorObj.setValues(req.body);
						reject(errorObj);
					};

					if (validation.hasAsync) {
						validation.passes(() => resolve(req.body));
						validation.fails(() => handleFails());
					} else {
						if (validation.passes()) {
							resolve(req.body);
						} else {
							handleFails();
						}
					}
				});
			};
			next();
		});
        ValidatorServiceProvider.registerCustomValidator();
    }
    
	static registerCustomValidator() {
		Validator.registerAsync("unique", async function (
			value,
			attribute,
			req,
			passes
		) {
			const attributes = attribute.split(",");

			const collection = attributes[0];
			const row = attributes[1] || req;

			const query = {};
			query[row] = value;

			const user = await mongoose.connection
				.collection(collection)
				.findOne(query);

			if (user) {
				passes(false, `${req} has already been taken.`);
			} else {
				passes();
			}
		});
	}
}

module.exports = ValidatorServiceProvider;
