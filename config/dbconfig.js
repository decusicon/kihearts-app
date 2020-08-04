// ASSIGN PROCESS.ENV
require("dotenv").config();

module.exports = {
  host: process.env.MONGO_HOSTNAME,
  port: process.env.MONGO_PORT,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DB,
  secret: process.env.APP_SECRET,
};
