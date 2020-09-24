let Route = require("express").Router();

Route.get('/login', require('@controllers/auth/LoginController').show);

Route.post('/login', require('@controllers/auth/LoginController').login);
Route.get('/logout', require('@controllers/auth/LoginController').logout);

Route.get("/register", require("@controllers/auth/RegisterController").show);
Route.post(
  "/register",
  require("@controllers/auth/RegisterController").register
);

Route.get("/register/complete/avatar", ...applyMiddleware([
  "auth",
]), require("@controllers/auth/RegisterController").showAvatar);

Route.post("/register/complete/avatar", ...applyMiddleware([
  "auth",
]), require("@controllers/auth/RegisterController").uploadAvatar);

Route.get("/forgot-password",require("@controllers/auth/ForgotPasswordController").show);

module.exports = Route;
