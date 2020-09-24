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

        return res.redirect(req.header("Referer") || "/");
    }
}

module.exports = ValidationError;
