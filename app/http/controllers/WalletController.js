class WalletController {
  async index(req, res) {
    res.render("pages/wallet", { title: "Wallets" });
  }
}

module.exports = new WalletController();
