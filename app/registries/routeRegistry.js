let app = require("express")();

app.use("/auth", require("@routes/auth"));

// app.use(
//   "/",
//   ...applyMiddleware([
//     "auth",
//     // "verify",
//     // "update_last_activity",
//     // "must_have_picture",
//   ]),
//   require("@routes/auth")
// );

// ROUTES
app.use("/campaigns", require("@src/routes/campaign"));
app.use("/myaccount", require("@src/routes/myaccount"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render("./error/404", {
    title: "Error",
  });
});

module.exports = app;
