module.exports = {
  globalMiddleware: [
    require("cors")(),

    require("express")("dev"), //-- use logger
    require("method-override")(),

    require("body-parser").urlencoded({ limit: "50mb", extended: true }),
    require("body-parser").json({ limit: "50mb", extended: true }),
    require("express").json({ limit: "50mb", extended: true }), //-- use express.json
    require("express").urlencoded({ limit: "50mb", extended: true }), //-- use express.urlencoded

    require("express-ejs-layouts"), //-- use expressLayouts
    require("express-fileupload")({
      createParentPath: true,
      debug: config("app", "debug"),
      useTempFiles: true,
      tempFileDir: require('os').tmpdir() || "/tmp/",
    }),

    require("connect-flash")(),
    require("@app/middlewares/flashMessage"),
  ],

  nameMiddleware: {
    auth: require("@app/middlewares/Authenticate"),
    verify: require("@app/middlewares/Verify"),
    guest: require("@app/middlewares/RedirectIfAuthenticated"),
    must_have_picture: require("@app/middlewares/MustHavePicture"),
    update_last_activity: require("@app/middlewares/UpdateLastActivity"),
  },
};
