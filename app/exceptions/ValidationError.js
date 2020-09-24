const BaseError = require('./BaseError');

class ValidationError extends BaseError {
  
    setErrors (errors) {
        this.errors = errors;
    }

    getErrors () {
        return this.errors;
    }

    handle(req, res) {
        req.flash("__errors__", this.errors);
        console.log(this.errors);
        req.flash('error', this.errors.details[0].message);

        return res.redirect(req.header("Referer") || "/");
    }
}

module.exports = ValidationError;
