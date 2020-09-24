const Campaign = require("@models/campaign");
const Joi = require("joi");
const path = require("path");
const cryptoRandomString = require("crypto-random-string");

class CampaignController {
	async index(req, res, next) {
		try {
			const campaigns = await Campaign.find({ userId: req.user._id });

			return res.render("pages/campaign", {
				title: "Campaigns",
				campaigns: campaigns,
			});
		} catch (error) {
			next(error);
		}
	}

	async store(req, res, next) {
		try {
			const user = req.user;
			const photos = [];

			const validationSchema = Joi.object({
				title: Joi.string().trim().required(),
				category: Joi.string().trim().required(),
				subCategory: Joi.string().trim().required(),
				reason: Joi.string().trim().required(),
				amount: Joi.number().integer().required(),
			});

			const valid = await validator(req.body, validationSchema);

			if (_.isEmpty(req.files.photo) && !_.isArray(req.files.photo)) {
				return res.send({
					type: "error",
					msg: "Image is required and must be more than 1",
					url: "/campaigns",
				});
			}

			const folderName = cryptoRandomString({
				length: 64,
				type: "url-safe",
			});

			//loop all files
			_.forEach(_.keysIn(req.files.photo), (key) => {
				let photo = req.files.photo[key];

				const fileName =
					cryptoRandomString({ length: 64, type: "url-safe" }) +
					path.extname(photo.name);

				photo.mv(
					`${storage_path(
						"app/public/campaign-photos"
					)}/${folderName}/${fileName}`
				);

				photos.push(`storage/campaign-photos/${folderName}/${fileName}`);
			});

			const campaign = new Campaign();

			campaign.userId = user.id;
			campaign.photos = photos;
			campaign.title = valid.title;
			campaign.category = valid.category;
			campaign.subCategory = valid.subCategory;
			campaign.reason = valid.reason;
			campaign.amount = valid.amount;

			await campaign.save();

			return res.send({
				type: "success",
				msg: "Success! You've just created a campaign.",
				url: "/campaigns",
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}

	async destroy(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new CampaignController();
