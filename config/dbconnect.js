var mongoose = require("mongoose");
var config = require("./dbconfig");

const dbconnection = () => {
  mongoose.connect(config.database, {
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
