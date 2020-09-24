class ErrorBag {
  
    constructor(errors) {

        this.errorsBag = errors[0];
    }

    has(name) {
        return _.has(this.errorsBag, name);
    }

    get(name) {
        const obj = _.get(this.errorsBag, name);
        return _.isEmpty(obj) ? null : obj["message"];
    }

    old(name) {
        const obj = _.get(this.errorsBag, name);
		return _.isEmpty(obj) ? null : obj["value"];
    }
    
}

module.exports = (req,res,next) => {

    const flashErrors = req.flash('__errors__');
    const oldValue = req.flash('__value__');

    // console.log(flashErrors);

    const errorBag = new ErrorBag(flashErrors);

    res.locals.errors = errorBag;

    next();
};
