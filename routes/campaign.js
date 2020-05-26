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
router.post("/create", upload.array("photo", 3), (req, res) => {
  const userId = req.user._id;
  const photos = [];

  if (req.files) {
    for (var i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const filePath = `${process.env.APP_URL}${file.path.split("public")[1]}`;
      photos.push(filePath);
    }

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
      res.send({
        status: "error",
        msg: "Please! Fill up all fields properly.",
        url: "/campaigns",
      });
    } else {
      var newCampaign = new Campaign({
        userId,
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
        photos,
      });

      // Save new campaign
      Campaign.saveCampaign(newCampaign, (err) => {
        if (err) console.log(err);
        else {
          res.send({
            status: "success",
            msg: "Success! You've just created a campaign.",
            url: "/campaigns",
          });
        }
      });
    }
  }
});

// POST -- edit campaign.
router.post("/edit/:id", upload.array("photo", 3), (req, res) => {
  const userId = req.user._id;
  const photos = [];

  console.log("FILES: ", req.files);

  if (req.files) {
    for (var i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const filePath = `${process.env.APP_URL}${file.path.split("public")[1]}`;
      photos.push(filePath);
    }

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

    var update = {
      userId,
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
      photos,
    };

    var query = { userId: req.user._id };
    Campaign.updateOne(query, update, (err, asdf) => {
      if (err) console.log(err);
      console.log("ASDF: ", asdf);
      req.flash("success", "Success! You've just updated a campaign.");
      res.redirect("/campaigns");
    });
  }
});

module.exports = router;
