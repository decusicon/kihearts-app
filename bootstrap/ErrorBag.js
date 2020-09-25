class ErrorBag {
  
    constructor(errors, oldValue) {

        this.errorsBag = errors[0];
        this.valueBag = oldValue[0];
    }

    has(name) {
        return _.has(this.errorsBag, name);
    }

    get(name) {
        return _.get(this.errorsBag, name);
    }

    old(name, defaultVal) {
        return _.get(this.valueBag, name, defaultVal);
    }
    
}

module.exports = (req,res,next) => {

    const flashErrors = req.flash('__errors__');
    const oldValue = req.flash('__value__');


    const errorBag = new ErrorBag(flashErrors, oldValue);

    res.locals.errors = errorBag;
    res.locals.old = (name, defaultVal = null) => errorBag.old(name, defaultVal);

    next();
};
