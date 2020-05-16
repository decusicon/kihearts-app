var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// SCHEMA
var CampaignSchema = mongoose.Schema({
  userId: { type: String, required: true },
  createdAt: { type: Number, required: true },
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
  stage: { type: String, required: true },
  coins: {
    target: { type: Number, required: false },
    total: { type: Number, required: false },
  },
  photosId: { type: String, required: false },
});

// MODEL
var Campaign = (module.exports = mongoose.model("Campaign", CampaignSchema));

// METHODS
// save a new campaign to db
module.exports.saveCampaign = (newCampaign, callback) => {
  newCampaign.save(callback());
};
