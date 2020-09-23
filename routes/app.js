let Route = require("express").Router();

Route.get("/", (req, res) => res.redirect("/dashboard"));
Route.get("/dashboard", require("@controllers/DashboardController").index);
Route.get("/advertise", require("@controllers/AdvertisementController").index);
Route.get("/investment", require("@controllers/InvestmentController").index);
Route.get("/donations", require("@controllers/DonationController").index);
Route.get("/wallets", require("@controllers/WalletController").index);


module.exports = Route;
