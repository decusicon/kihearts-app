var express = require("express");
var router = express.Router();

// MODELS
var Campaign = require("../models/campaign");

// GET -- fetch page.
router.get("/", (req, res) => {
  res.render("pages/campaign", { title: "Campaigns" });
});

// POST -- create campaign.
router.post("/create", (req, res) => {
  const userId = req.user._id;
  const createdAt = Date.now();
  const target = 20000;
  const total = 0;
  const stage = "active";

  const {
    title,
    category,
    subCategory,
    reason,
    amount,
    accountName,
    accountNumber,
    bank,
  } = global.gatherCampaignBodyVariables(req);

  var campaignErrors = req.validationErrors();

  if (campaignErrors) {
    req.session.customErrors = campaignErrors;
    res.locals.customErrors = req.session.customErrors;
    // res.render("pages/auth/register", { title: "Register" });
    req.flash("error", "Please! Fill up all fields.");
    res.redirect("/campaigns");
    res.end();
  } else {
    req.session.customErrors = [];
    var newCampaign = new Campaign({
      userId,
      createdAt,
      title,
      category,
      subCategory,
      reason,
      amount,
      bankDetails: {
        accountName,
        accountNumber,
        bank,
      },
      stage,
      coins: {
        target,
        total,
      },
    });

    // Save new campaign
    Campaign.saveCampaign(newCampaign, (err) => {
      if (err) console.log(err);
      else {
        req.flash("success", `Success! You've just created a campaign.`);
        res.redirect("/campaigns");
      }
    });
  }
});

module.exports = router;
