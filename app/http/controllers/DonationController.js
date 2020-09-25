class DonationController {
  async index(req, res) {
    res.render("pages/donation", { title: "Donations" });
  }
}

module.exports = new DonationController();
