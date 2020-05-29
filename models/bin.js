var mongoose = require("mongoose");

// SCHEMA
var BinSchema = mongoose.Schema({
  prettyDate: { type: String, default: new Date() },
  joined: { type: Number, default: Date.now() },
  from: { type: String, required: true },
  binBag: {},
});

// MODEL
var Bin = (module.exports = mongoose.model("Bin", BinSchema));

// METHODS
// save a new bin to db
module.exports.sendToBin = (newBin, callback) => {
  newBin.save(callback());
};
