class InvestmentController {
  static async index(req, res) {
    res.render("pages/investment", { title: "Investment" });
  }
}

module.exports = InvestmentController;
