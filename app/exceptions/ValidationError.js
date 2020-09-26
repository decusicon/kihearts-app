const BaseError = require('./BaseError');

class ValidationError extends BaseError {
	setErrors(errors) {
		this.errors = errors;
	}

	setValues(values) {
		this.values = values;
	}

	getErrors() {
		return this.errors;
	}

	getValues() {
		return this.values;
	}

	handle(req, res) {
		const message = this.message || 'Invalid';
		const errors = this.getErrors().errors;
		const values = this.getValues();

		return res.format({
			"text/html": function () {
				req.flash("__errors__", errors);
				req.flash("__value__", values);
				req.flash("error", message);
				res.redirect(req.header("Referer") || "/");
			},
			"application/json": function () {
				res.status(400).send({
					message: "Bad Request",
					errors: errors,
					values : values 
				});
			},
			default: function () {
				// log the request and respond with 406
				res.status(406).send("Not Acceptable");
			},
		});
	}
}
module.exports = ValidationError;
