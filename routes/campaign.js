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
var Campaign = require("@models/campaign");
var Bin = require("@models/bin");



// POST -- edit campaign.
router.post("/edit/:_id", upload.array("photo", 3), (req, res) => {
	const {
		title,
		category,
		subCategory,
		reason,
		amount,
	} = global.gatherCampaignBodyVariables(req);

	var query = { _id: req.params._id, userId: req.user._id };
	var update = {
		title,
		category,
		subCategory,
		reason,
		amount,
	};

	Campaign.updateOne(query, update, (err) => {
		if (err) console.log(err);
		else {
			res.send({
				type: "success",
				msg: "Success! You've just updated a campaign.",
				url: "/campaigns",
			});
		}
	});
});

// DELETE -- delete campaign.
router.delete("/edit/:id/delete", (req, res) => {
	var query = { _id: req.params.id };

	Campaign.findOne(query, (err, doc) => {
		if (err) console.log(err);
		else {
			var newBin = new Bin({
				from: "campaign",
				binBag: { doc },
			});

			Bin.sendToBin(newBin, (err) => {
				if (err) console.log(err);
				else {
					Campaign.deleteOne(query, (err) => {
						if (err) console.log(err);
						else {
							res.send({
								type: "success",
								msg: "Success! You've just updated a campaign.",
								url: "/campaigns",
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;
