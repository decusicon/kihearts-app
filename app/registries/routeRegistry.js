let app = require("express")();

app.use("/auth", require("@routes/auth"));

app.use(
  "/",
  ...applyMiddleware([
    "auth",
    "must_have_picture",
    // "verify",
    // "update_last_activity",
  ]),
  require("@routes/app")
);

app.use('/404', (req, res, next) => {
  res.render("./errors/error", {
    title: "Error",
  });
})

// catch 404 and forward to error handler
// app.use((req, res, next) => res.redirect('/404'));

module.exports = app;
