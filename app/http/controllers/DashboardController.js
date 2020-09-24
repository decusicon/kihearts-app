class DashboardController {
    async index(req, res) {
        res.render("pages/dashboard", {
          title: "Dashboard",
        });
    }
}

module.exports = new DashboardController();