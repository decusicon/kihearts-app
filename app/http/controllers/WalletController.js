class WalletController {
  static async index(req, res) {
    res.render("pages/wallet", { title: "Wallets" });
  }
}

module.exports = WalletController;
