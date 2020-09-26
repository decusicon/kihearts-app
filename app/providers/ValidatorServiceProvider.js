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
			const field = attributes[1] || req;

			const query = {};
			query[field] = { $eq: value };

			if(attributes.length == 4) {
				attributes[2] = attributes[2] == "id" ? "_id" : attributes[2];

				attributes[3] =
					attributes[2] == "_id"
						? require("mongoose").Types.ObjectId(attributes[3])
						: attributes[3];

				query[attributes[2]] = { $ne: attributes[3] };
			}

			if (attributes.length == 3) {
				query[field]["$ne"] = attributes[2];
			}


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
