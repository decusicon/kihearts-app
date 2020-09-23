module.exports = {
  globalMiddleware: [
    require("cors"),
    require("express")("dev"), //-- use logger
    require("express").methodOverride(),
    require("express").bodyParser(),
    require("express").json({ limit: "50mb", extended: true }), //-- use express.json
    require("express").urlencoded({ limit: "50mb", extended: true }), //-- use express.urlencoded
    require("express").cookieParser(), //-- use cookieParser
    require("express").session({
      secret: config("app", "key"),
      resave: true,
      saveUninitialized: true,
    }),
    require("express").static(public_path()), //-- set public static directory
    require("express-ejs-layouts"), //-- use expressLayouts

    require("express-fileupload")({
      createParentPath: true,
      debug : config('app', 'debug'),
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }),

    require("connect-flash")(),
    require("@app/middlewares/flashMessage"),
    require("passport").initialize(),
    require("passport").session(),
  ],

  nameMiddleware: {
    auth: require("@app/middlewares/Authenticate"),
    verify: require("@app/middlewares/Verify"),
    guest: require("@app/middlewares/RedirectIfAuthenticated"),
    must_have_picture: require("@app/middlewares/MustHavePicture"),
    update_last_activity: require("@app/middlewares/UpdateLastActivity"),
  },
};
