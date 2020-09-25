
class ForgotPasswordController {
  async show(req, res) {
    res.render("pages/auth/forgot-password", { title: "Forgot Password" });
  }
}

module.exports = new ForgotPasswordController();
