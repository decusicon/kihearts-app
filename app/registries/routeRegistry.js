let app = require("express")();

app.use("/auth", require("@routes/auth"));
app.use("/", ...applyMiddleware([
    "auth",
    // "verify",
    // "update_last_activity",
    // "must_have_picture",
  ]),
  require("@routes/auth")
);

// ROUTES
app.use("/campaigns", require('./campaign'));
app.use("/myaccount", require('./myaccount'));

module.exports = app;
