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
var moment = require("moment");

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

// CUSTOM MIDDLEWARES
// Assign PROCESS.ENV middleware
app.use((req, res, next) => {
  require("dotenv").config();
  next();
});

// Gather all Variables middleware
app.use((req, res, next) => {
  // Gather user's body variables
  global.gatherUserBodyVariables = (req) => {
    const firstname = req.body.firstname
      ? req.body.firstname.toLowerCase().trim()
      : "";
    const lastname = req.body.lastname
      ? req.body.lastname.toLowerCase().trim()
      : "";
    const nickname = req.body.nickname
      ? req.body.nickname.toLowerCase().trim()
      : "";
    const email = req.body.email ? req.body.email.toLowerCase().trim() : "";
    const phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : "";
    const password = req.body.password ? req.body.password : "";
    const re_password = req.body.re_password ? req.body.re_password : "";
    const country = req.body.country
      ? req.body.country.toLowerCase().trim()
      : "";
    const state = req.body.state ? req.body.state.toLowerCase().trim() : "";
    const city = req.body.city ? req.body.city.toLowerCase().trim() : "";
    const postalcode = req.body.postalcode ? req.body.postalcode : "";
    const homeAddress = req.body.homeAddress
      ? req.body.homeAddress.toLowerCase().trim()
      : "";

    // next of kin
    const next_firstname = req.body.next_firstname
      ? req.body.next_firstname.toLowerCase().trim()
      : "";
    const next_lastname = req.body.next_lastname
      ? req.body.next_lastname.toLowerCase().trim()
      : "";
    const next_relationship = req.body.next_relationship
      ? req.body.next_relationship.toLowerCase().trim()
      : "";
    const next_email = req.body.next_email
      ? req.body.next_email.toLowerCase().trim()
      : "";
    const next_phoneNumber = req.body.next_phoneNumber
      ? req.body.next_phoneNumber
      : "";
    const next_country = req.body.next_country
      ? req.body.next_country.toLowerCase().trim()
      : "";
    const next_state = req.body.next_state
      ? req.body.next_state.toLowerCase().trim()
      : "";
    const next_city = req.body.next_city
      ? req.body.next_city.toLowerCase().trim()
      : "";
    const next_postalcode = req.body.next_postalcode
      ? req.body.next_postalcode
      : "";
    const next_homeAddress = req.body.next_homeAddress
      ? req.body.next_homeAddress.toLowerCase().trim()
      : "";

    // bank details
    const accountName = req.body.accountName
      ? req.body.accountName.toLowerCase().trim()
      : "";
    const accountNumber = req.body.accountNumber
      ? req.body.accountNumber.toLowerCase().trim()
      : "";
    const bank = req.body.bank ? req.body.bank.toLowerCase().trim() : "";

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

    // check for bank details error
    req.checkBody("accountName", "Required!").notEmpty();
    req.checkBody("accountNumber", "Required!").isInt();
    req.checkBody("bank", "Required!").notEmpty();
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
      accountName,
      accountNumber,
      bank,
    };
  };

  // Gather campaign's body variables
  global.gatherCampaignBodyVariables = (req) => {
    console.log("BODY VARIABLES: ", req.body);
    const title = req.body.title ? req.body.title.toLowerCase().trim() : "";
    const category = req.body.category
      ? req.body.category.toLowerCase().trim()
      : "";
    const subCategory = req.body.subCategory
      ? req.body.subCategory.toLowerCase().trim()
      : "";
    const reason = req.body.reason ? req.body.reason.toLowerCase().trim() : "";
    const amount = req.body.amount ? req.body.amount.toLowerCase().trim() : "";

    // check for user's errors
    req.checkBody("title", "Required!").notEmpty();
    req.checkBody("category", "Required!").notEmpty();
    req.checkBody("subCategory", "Required!").notEmpty();
    req.checkBody("reason", "Required!").notEmpty();
    req.checkBody("amount", "Required!").isInt();
    return {
      title,
      category,
      subCategory,
      reason,
      amount,
    };
  };
  next();
});

// Global Variables
app.use((req, res, next) => {
  global.defaultAvatar = `${process.env.APP_URL}/images/users/user.jpg`;
  global.user = req.user; // for global use
  res.locals.user = global.user; // for views use
  res.locals.customErrors = []; // registration errors

  // Convert string into name like
  res.locals.nameCase = (word) => {
    word = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    return word;
  };

  // Convert string into sentence like
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

  // Convert string into uppercase
  res.locals.upperCase = (word) => {
    return word.toUpperCase();
  };

  // Convert string into lowercase
  res.locals.lowerCase = (word) => {
    return word.toLowerCase().trim();
  };

  // Add 0 to account or phone number that are suppose to be 10 or 11 respectively
  res.locals.addZero = (number, type) => {
    var numberStr = String(number);
    if (type == "phoneNumber") {
      if (numberStr.length == 10) {
        return `0${number}`;
      }
    }

    if (type == "accountNumber") {
      if (numberStr.length == 9) {
        return `0${number}`;
      }
    }

    return number;
  };

  // Send moment to client
  res.locals.moment = moment;
  next();
});

// Check is user have an avatar image
app.use((req, res, next) => {
  // Check every route, whether user has an avatar, else display upload-avatar view
  global.isThereAvatar = (req, res) => {
    if (!req.originalUrl.includes("auth")) {
      if (global.user) {
        if (
          global.user.avatar == "" ||
          global.user.avatar == global.defaultAvatar
        ) {
          res.render("pages/upload-avatar", {
            title: "Upload a Photo",
          });
          res.end();
        }
      }
    }
  };
  next();
});

// Global Redirects
app.use((req, res, next) => {
  // Redirect to login page if user is not found on any pages.
  if (!req.user) !req.url.includes("auth") ? res.redirect("/auth/login") : "";
  else {
    // Redirect to dashboard if user is found on auth pages.
    if (
      req.url.includes("login") ||
      req.url.includes("register") ||
      req.url.includes("forgot-password")
    ) {
      res.end();
      res.redirect("/dashboard");
    }

    // Check every route, whether user has an avatar, else display upload-avatar view
    if (req.method.toLowerCase().trim() == "get" && req.url != "")
      global.isThereAvatar(req, res);
  }
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
// app.use((err, req, res, next) => {
//   // User is not login, Redirect to login page if user enters a wrong address.
//   // if (!req.user) req.url.includes("auth") ? res.redirect("/auth/login") : "";
//   // // Else show him an error page.
//   // else {
//   //   // set locals, only providing error in development
//   //   res.locals.message = err.message;
//   //   res.locals.error = req.app.get("env") === "development" ? err : {};
//   //   // render the error page
//   //   res.status(err.status || 500);
//   //   res.render("./errors/error", { title: "You're Lost!" });
//   // }
// });

module.exports = app;
