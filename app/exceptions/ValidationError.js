const BaseError = require('./BaseError');

class ValidationError extends BaseError {
  
    setErrors (errors) {
        this.errors = errors;
    }

    getErrors () {
        return this.errors;
    }

    handle(req, res) {
		const errors = this.errors;

		if(errors instanceof Error) {
			res.redirect(req.header("Referer") || "/");
		}
		
		const errorBag = {};
		errors.details.forEach(error => errorBag[error.context.key] = error.message.split('"').join(''));				

        return res.format({
			"text/html": function () {
				req.flash("__errors__", errorBag);
				req.flash("__value__", errors._original);
				req.flash(
					"error",
					errors.details[0].message.split('"').join("")
				);
				res.redirect(req.header("Referer") || "/");
			},
			"application/json": function () {
                res.status(400).send({
					message: "Bad Request",
					errors: errors.details,
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
