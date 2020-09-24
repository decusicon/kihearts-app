const { body } = require("express-validator/check");

module.exports =
  validator([
    (body("username").trim().isString(),
    body("password").trim().isLength({ min: 6, max: 25 }))
  ]);

