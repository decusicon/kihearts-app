var express = require("express");

express.request.message = (event, message) => {
  var __message = express.response.locals.message;
  __message = { event, message };
};

module.exports = {};
