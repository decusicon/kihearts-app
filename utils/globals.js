// GLOBAL
app.get("*", (req, res, next) => {
  global.user = req.user;

  res.locals.user = global.user;
  res.locals.regErrors = [];
  res.locals.message = [];
  next();
});
