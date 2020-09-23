var mongoose = require("mongoose");

class DatabaseServiceProvider {
  static handle(app) {

    const username = config("database", "username");
    const password = config("database", "password");
    const host = config("database", "host");
    const port = config("database", "port");
    const database = config("database", "database");
    const secret = config("database", "secret");

    const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    var connection = mongoose.connection;

    connection.once("open", () => {
      console.log("Connected to MongoDB -> Kihearts");
    });

    connection.on("error", (err) => {
      console.log(err);
    });

    return connection;
  };
}

module.exports = DatabaseServiceProvider;
