var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");

// MULTER
// Upload middleware
// This creates the storage for saving the file on disk.
var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const createAndSetDestination = (loc) => {
        if (!fs.existsSync(loc)) {
          fs.mkdir(loc, { recursive: true }, (err) => {
            if (err) console.log(err);
            createAndSetDestination(loc);
          });
        } else cb(null, loc);
      };
      createAndSetDestination(`public/temp/${req.user.email}/photos`);
    },

    filename: (req, file, cb) => {
      const uniqueFilename = `campaign${
        file.fieldname
      }_${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    },
  }),
});

// MODELS
var Campaign = require("../models/campaign");

// GET -- fetch page.
router.get("/", (req, res) => {
  var query = { userId: req.user._id };
  Campaign.find(query, (err, campaigns) => {
    if (err) console.log(err);
    res.render("pages/campaign", { title: "Campaigns", campaigns });
  });
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
    req.flash("error", "Please! Fill up all fields properly.");
    res.redirect("/campaigns");
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

router.post("/create/photos", upload.array("photo", 3), (req, res) => {
  console.log("FILES: ", req.files);
  req.flash("success", "Success! Working fine.");
  res.redirect("/campaigns");
});

module.exports = router;
