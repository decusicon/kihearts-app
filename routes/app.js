let Route = require("express").Router();

Route.get("/", (req, res) => res.redirect("/dashboard"));

Route.get("/dashboard", require("@controllers/DashboardController").index);

Route.get("/advertise", require("@controllers/AdvertisementController").index);
Route.get("/investment", require("@controllers/InvestmentController").index);
Route.get("/donations", require("@controllers/DonationController").index);
Route.get("/wallets", require("@controllers/WalletController").index);

Route.get("/myaccount", require("@controllers/UserController").index);
Route.post("/myaccount", require("@controllers/UserController").update);
Route.post(
	"/myaccount/details",
	require("@controllers/UserController").updateDetail
);
Route.post(
	"/myaccount/password",
	require("@controllers/UserController").updatePassword
);
Route.post(
	"/myaccount/bank",
	require("@controllers/UserController").updateBank
);
Route.post(
	"/myaccount/avatar",
	require("@controllers/UserController").updateAvatar
);

Route.get("/campaigns", require("@controllers/CampaignController").index);
Route.post(
	"/campaigns/create",
	require("@controllers/CampaignController").store
);
Route.post(
	"/campaigns/edit/:id",
	require("@controllers/CampaignController").update
);
Route.delete(
	"/campaigns/edit/:id/delete",
	require("@controllers/CampaignController").destroy
);

module.exports = Route;
