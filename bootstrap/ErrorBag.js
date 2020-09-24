class ErrorBag {
  
    constructor(errors) {
        this.errorsBag = errors
    }
    
}

module.exports = (req,res,next) => {

    const flashErrors = req.flash('__errors__') || {};

    const errorBag = new ErrorBag(flashErrors);

    res.locals.errors = errorBag;

    next();
};
