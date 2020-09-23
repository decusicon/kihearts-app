var mongoose = require("mongoose");

class DatabaseServiceProvider {
  static handle() {
    const { username, password, host, port, database } = config('database');

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
