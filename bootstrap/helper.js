const path = require("path");
const fs = require("fs");

global["storage_path"] = (path_join = "") => path.join(base_path, "storage", path_join);
global["public_path"] = (path_join = "") => path.join(base_path, "public", path_join);
global["view_path"] = (path_join = "") => path.join(base_path, "views", path_join);
global["config_path"] = (path_join = "") => path.join(base_path, "config", path_join);

//-- Log User's activities to "userActivity.log" Log file
global["userLog"] = (log) => {
  fs.mkdir(
    storage_path("logs"),
    {
      recursive: true,
    },
    (err) => {
      if (err) console.log(err);
      else {
        fs.appendFile(
          path.join(storage_path("logs"), "userActivity.log"),
          `@ ${new Date().toString()} -- [ ${log} ]\n`,
          (err) => {
            if (err) console.log("Unable to write to userActivity.log");
          }
        );
      }
    }
  );
};

global["arrayLast"] = (array) => {
  return array[array.length - 1];
};

global["applyMiddleware"] = (middleware) => {
  let nameMiddleware = require("@app/registries/middlewareRegistry")
    .nameMiddleware;

  let resolveMiddleware = [];

  if (middleware instanceof Array) {
    middleware.forEach((value) => resolveMiddleware.push(nameMiddleware[value]));
  } 
  
  if (middleware instanceof String) {
    resolveMiddleware.push(nameMiddleware[middleware]);
  } 

  return resolveMiddleware;
};

global["getEnv"] = (env_name, default_value = null) => {
  if (process.env[env_name] === "false") {
    return false;
  } 

  if (process.env[env_name] === "true") {
    return true;
  }

  return process.env[env_name] || default_value;
  
};

global["config"] = (fileName, configVar, defaultVar) => {
  let items = require(config_path(fileName));

  if (typeof configVar === "function") {
    return configVar(items) || defaultVar;
  } else {
    return items[configVar] || defaultVar;
  }
};

global['normalizePort'] = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
