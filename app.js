const Bootstrap = require("./bootstrap/index");

let server = new Bootstrap(__dirname).initHttp();

module.exports = server;