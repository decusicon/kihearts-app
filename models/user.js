var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// SCHEMA
var UserSchema = mongoose.Schema({
  avatar: { type: String, required: false },
  prettyDate: { type: String, default: new Date() },
  joined: { type: Number, default: Date.now() },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  postalcode: { type: Number, required: true },
  homeAddress: { type: String, required: true },
  nextOfKin: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    relationship: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    postalcode: { type: Number, required: true },
    homeAddress: { type: String, required: true },
  },
  bankDetails: {
    accountName: { type: String, required: true, default: "" },
    accountNumber: { type: Number, required: true, default: 0 },
    bank: { type: String, required: true, default: "" },
  },
});

// MODEL
var User = (module.exports = mongoose.model("User", UserSchema));

// METHODS
// save a new user to db
module.exports.saveUser = (newUser, callback) => {
  // Hash password before saving
  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.log(err);
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) console.log(err);
      newUser.password = hash;
      newUser.save(callback());
    });
  });
};
