class InvestmentController {
  async index(req, res) {
    res.render("pages/investment", { title: "Investment" });
  }
}

module.exports = new InvestmentController();
