var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var config = require("./config/dbconfig");
var app = express();
var cors = require("cors");
var expressLayouts = require("express-ejs-layouts");
var expressValidator = require("express-validator");

// DB CONNECTION
var dbconnect = require("./config/dbconnect");
dbconnect();

// ROUTERS
var dashboardRouter = require("./routes/dashboard");
var campaignsRouter = require("./routes/campaign");
var donationsRouter = require("./routes/donation");
var advertiseRouter = require("./routes/advertise");
var investmentRouter = require("./routes/investment");
var myAccountRouter = require("./routes/myaccount");
var walletsRouter = require("./routes/wallet");
var authRouter = require("./routes/auth");

// MIDDLEWARES
// view engine setup middlewares
app.engine(".html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// other middlewares
app.use(cors());
app.use(expressLayouts);
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// express session middleware
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
  })
);

// express messages middlewares
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// express validator middleware
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += `[${namespace.shift()}]`;
      }
      return {
        param: formParam,
        msg,
        value,
      };
    },
  })
);

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// ASSIGN PROCESS.ENV middleware
app.use((req, res, next) => {
  require("dotenv").config();
  next();
});

// Gather all Variables middleware
app.use((req, res, next) => {
  global.gatherBodyVariables = (req) => {
    const firstname = req.body.firstname
      ? req.body.firstname.toLowerCase()
      : "";
    const lastname = req.body.lastname ? req.body.lastname.toLowerCase() : "";
    const nickname = req.body.nickname ? req.body.nickname.toLowerCase() : "";
    const email = req.body.email ? req.body.email.toLowerCase() : "";
    const phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : "";
    const password = req.body.password ? req.body.password : "";
    const re_password = req.body.re_password ? req.body.re_password : "";
    const country = req.body.country ? req.body.country.toLowerCase() : "";
    const state = req.body.state ? req.body.state.toLowerCase() : "";
    const city = req.body.city ? req.body.city.toLowerCase() : "";
    const postalcode = req.body.postalcode ? req.body.postalcode : "";
    const homeAddress = req.body.homeAddress
      ? req.body.homeAddress.toLowerCase()
      : "";

    // next of kin
    const next_firstname = req.body.next_firstname
      ? req.body.next_firstname.toLowerCase()
      : "";
    const next_lastname = req.body.next_lastname
      ? req.body.next_lastname.toLowerCase()
      : "";
    const next_relationship = req.body.next_relationship
      ? req.body.next_relationship.toLowerCase()
      : "";
    const next_email = req.body.next_email
      ? req.body.next_email.toLowerCase()
      : "";
    const next_phoneNumber = req.body.next_phoneNumber
      ? req.body.next_phoneNumber
      : "";
    const next_country = req.body.next_country
      ? req.body.next_country.toLowerCase()
      : "";
    const next_state = req.body.next_state
      ? req.body.next_state.toLowerCase()
      : "";
    const next_city = req.body.next_city
      ? req.body.next_city.toLowerCase()
      : "";
    const next_postalcode = req.body.next_postalcode
      ? req.body.next_postalcode
      : "";
    const next_homeAddress = req.body.next_homeAddress
      ? req.body.next_homeAddress.toLowerCase()
      : "";

    // check for user's errors
    req.checkBody("firstname", "Required!").notEmpty();
    req.checkBody("lastname", "Required!").notEmpty();
    req.checkBody("nickname", "Required!").notEmpty();
    req.checkBody("email", "Required!").isEmail();
    req.checkBody("phoneNumber", "Required!").isInt();
    req.checkBody("password", "Required!").notEmpty();
    req.checkBody("re_password", "Required!").equals(password);
    req.checkBody("country", "Required!").notEmpty();
    req.checkBody("state", "Required!").notEmpty();
    req.checkBody("city", "Required!").notEmpty();
    req.checkBody("postalcode", "Required!").isPostalCode("any");
    req.checkBody("homeAddress", "Required!").notEmpty();

    // check for next of kin's error
    req.checkBody("next_firstname", "Required!").notEmpty();
    req.checkBody("next_lastname", "Required!").notEmpty();
    req.checkBody("next_relationship", "Required!").notEmpty();
    req.checkBody("next_email", "Required!").isEmail();
    req.checkBody("next_phoneNumber", "Required!").isInt();
    req.checkBody("next_country", "Required!").notEmpty();
    req.checkBody("next_state", "Required!").notEmpty();
    req.checkBody("next_city", "Required!").notEmpty();
    req.checkBody("next_postalcode", "Required!").isPostalCode("any");
    req.checkBody("next_homeAddress", "Required!").notEmpty();
    return {
      firstname,
      lastname,
      nickname,
      email,
      phoneNumber,
      password,
      country,
      state,
      city,
      postalcode,
      homeAddress,
      next_firstname,
      next_lastname,
      next_relationship,
      next_email,
      next_phoneNumber,
      next_country,
      next_state,
      next_city,
      next_postalcode,
      next_homeAddress,
    };
  };
  next();
});

// Set all global variables
app.use((req, res, next) => {
  global.defaultAvatar = `${process.env.APP_URL}/images/users/user.jpg`;
  global.user = req.user;
  next();
});

// Check if there is no avatar image, then render upload avatar view
const isThereAvatar = (req, res) => {
  if (!req.originalUrl.includes("auth")) {
    // Check if there is avatar image, then display upload-avatar view.
    if (global.user) {
      if (
        global.user.avatar == "" ||
        global.user.avatar == global.defaultAvatar
      ) {
        res.render("pages/upload-avatar", {
          title: "Upload a Photo",
        });
      }
    }
  }
};

// GLOBAL ROUTES
app.get("*", (req, res, next) => {
  res.locals.user = global.user; // for views use
  res.locals.regErrors = []; // registration errors

  res.locals.nameCase = (word) => {
    word = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    return word;
  };

  res.locals.sentenceCase = (word) => {
    word = word.toLowerCase().trim();
    let result = "";
    if (word.includes(" ")) {
      let wordArr = [];
      let words = word.split(" ");
      words.forEach((word) => {
        wordArr.push(
          word.replace(word.charAt(0), word.charAt(0).toUpperCase())
        );
      });

      return (wordArr = wordArr.join(" "));
    }
    result = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    return result;
  };

  if (!req.user) !req.url.includes("auth") ? res.redirect("/auth/login") : "";
  else {
    req.url.includes("auth") && !req.url.includes("logout")
      ? res.redirect("/dashboard")
      : "";
  }

  isThereAvatar(req, res);
  next();
});

app.post("*", (req, res, next) => {
  global.user = req.user; // for global use

  if (!req.user) !req.url.includes("auth") ? res.redirect("/auth/login") : "";
  else
    req.url.includes("auth") && !req.url.includes("logout")
      ? res.redirect("/dashboard")
      : "";
  next();
});

// ROUTES
app.get("/", (req, res) => res.redirect("/dashboard"));
app.use("/dashboard", dashboardRouter);
app.use("/campaigns", campaignsRouter);
app.use("/donations", donationsRouter);
app.use("/advertise", advertiseRouter);
app.use("/investment", investmentRouter);
app.use("/myaccount", myAccountRouter);
app.use("/wallets", walletsRouter);

// AUTH ROUTE
app.use("/auth/", authRouter);

// passport config
require("./config/passport-config")(passport);

// ERROR HANDLERS
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("./errors/error", { title: "You're Lost!" });
});

module.exports = app;
