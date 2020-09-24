let User = require('@models/user');
module["exports"] = function (req, res, next) {

    if (!req.user) {
        return res.redirect('/auth/login');
    } 

    if(!req.user.hasAvatar) {
        return res.redirect('/auth/register/complete/avatar');
    }
    
    next();
};