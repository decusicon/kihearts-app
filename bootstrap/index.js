const express = require("express");
const fs = require("fs");

class Bootstrap {
  constructor(base_path) {
    this.setBasePath(base_path);
    return this;
  }

  setBasePath(base_path) {
    global["base_path"] = base_path;
  }

  loadEnvironmentalVariables() {
    if (fs.existsSync(`${base_path}/.env`)) {
      require("dotenv").config({ path: `${base_path}/.env` });
    }
  }

  requireAllImportantModules() {
    this.loadEnvironmentalVariables();
    require("module-alias/register");
    require("@bootstrap/helper");
  }

  registerGlobalMiddleware() {
    require("@app/registries/middlewareRegistry").globalMiddleware.forEach(
      (value) => {
        this.app.use(value);
      }
    );
  }

  registerRoutes() {
    this.app.use(require("@app/registries/routeRegistry"));
  }

  registerExceptionHandler() {
    const Handler = require("@app/exceptions/Handler");

    this.app.use((err, req, res, next) => {
	  const handler = new Handler(this.app);
      handler.setError(err);
      handler.setReq(req);
      handler.setRes(res);
      handler.handle();
    });

    // ERROR HANDLERS

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
  }

  registerProviders() {
    require("@src/config/app").providers.forEach((value) => {
      value.handle(this.app);
    });
  }

  registerFacades() {
    let facade = require("@src/config/app").alias;
    Object.keys(facade).forEach((key) => {
      global[key] = facade[key];
    });
  }

  register() {
	this.app.set("port", normalizePort(config("app", "port")));

    this.app.set("views", view_path());
    this.app.engine(".html", require("ejs").renderFile);
    this.app.set("view engine", "html");
  }

  initHttp() {
    this.app = express();
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.requireAllImportantModules();

    this.registerFacades();
    this.registerProviders();

    this.registerGlobalMiddleware();
    this.register();
    this.registerRoutes();

    this.registerExceptionHandler();
	// this.initSocket();
	
    return this.server;
  }

  //   initSocket() {
  //     const meetups = require("@models/meetup");

  //     this.io.on("connection", (socket) => {
  //       //-- on listen to typing... notification
  //       socket.on("chat composing", (msg) => {
  //         this.io.emit(`${msg.to} composing`, msg);
  //         meetups.updateUserLastActivity(msg);
  //         this.io.emit("am active", { user: msg.from }); //-- send online shout to other user
  //       });

  //       //-- on listen to message from channel
  //       socket.on("chat message", (msg) => {
  //         meetups.appendOrCreate(msg); //-- Added To Meetup Table
  //         this.io.emit(`${msg.from} acknowledge`, msg); //-- send back Acknowledge Message
  //         this.io.emit(`${msg.to} message`, msg); //-- send to other user
  //         this.io.emit("am active", { user: msg.from }); //-- send online shout to other user
  //       });

  //       socket.on("chat received", (msg) => {
  //         meetups.updateChatToDelivered(msg); //-- update delivered @ on database
  //         this.io.emit(`${msg.from} delivered`, msg);
  //       });
  //     });
  //   }

  //   initConsole() {
  //     this.loadEnvironmentalVariables();
  //     require("module-alias/register");
  //     require("@bootstrap/Helper");
  //     // require('@bootstrap/Passport-setup');
  //     require("@bootstrap/Database");
  //     this.registerFacade();
  //   }
}

module.exports = Bootstrap;
