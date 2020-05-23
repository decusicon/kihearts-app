var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// SCHEMA
var CampaignSchema = mongoose.Schema({
  userId: { type: String, required: true },
  prettyDate: { type: String, default: new Date() },
  createdAt: { type: Number, default: Date.now() },
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
  stage: { type: String, default: "active" },
  coins: {
    target: { type: Number, default: 20000 },
    total: { type: Number, default: 0 },
  },
  photos: [],
});

// MODEL
var Campaign = (module.exports = mongoose.model("Campaign", CampaignSchema));

// METHODS
// save a new campaign to db
module.exports.saveCampaign = (newCampaign, callback) => {
  newCampaign.save(callback());
};
