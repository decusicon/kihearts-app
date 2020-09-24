const BaseError = require('./BaseError');

class ValidationError extends BaseError {
  
    setErrors (errors) {
        this.errors = errors;
    }

    getErrors () {
        return this.errors;
    }

    handle(req, res) {
        console.log(this.errors);
        const errors = this.errors;
        

        return res.format({
		
			"text/html": function () {
				req.flash("__errors__", errors);
				req.flash("error", errors.details[0].message);
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
