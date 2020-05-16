var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// SCHEMA
var CampaignSchema = mongoose.Schema({
  userId: { type: String, required: true },
  created: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  reason: { type: String, required: true },
  amount: { type: Number, required: true },
  bankDetails: {
    accountName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    bank: { type: String, required: true },
  },
  photosId: { type: String, required: true },
});

// MODEL
var Campaign = (module.exports = mongoose.model("Campaign", CampaignSchema));

// METHODS
// save a new campaign to db
module.exports.savePhoto = (newCampaign, callback) => {
  newCampaign.save(callback());
};
