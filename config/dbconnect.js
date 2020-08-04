var mongoose = require("mongoose");
var config = require("./dbconfig");

const dbconnection = () => {
  const { username, password, host, port, database } = config;

  const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to MongoDB -> Kihearts");
  });

  db.on("error", (err) => {
    console.log(err);
  });

  return db;
};

module.exports = dbconnection;
