const { body } = require("express-validator");

module.exports = function () {
    return [
      body("username").isEmail(),
      body("password").isLength({ min: 5 }),
    ];
}