class DonationController {
  static async index(req, res) {
    res.render("pages/donation", { title: "Donations" });
  }
}

module.exports = DonationController;
