module["exports"] = function (req, res, next) {
  if (!req.user) {
    return res.redirect("/auth/login");
  } 

  res.locals.authUser = req.user;
  res.locals.user = req.user;
  
  next();
};
