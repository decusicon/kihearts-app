var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// SCHEMA
var PhotoSchema = mongoose.Schema({
  userId: { type: String, required: true },
  belong: { to: { type: String, required: true } },
  photos: [],
});

// MODEL
var Photo = (module.exports = mongoose.model("Photo", PhotoSchema));

// METHODS
// save a new photo to db
module.exports.savePhoto = (newPhoto, callback) => {
  newPhoto.save(callback());
};
