const Campaign = require("@models/campaign");

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
