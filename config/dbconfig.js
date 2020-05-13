// ASSIGN PROCESS.ENV
require("dotenv").config();

module.exports = {
  database: process.env.MONGODB_URI,
  secret: process.env.APP_SECRET,
};
