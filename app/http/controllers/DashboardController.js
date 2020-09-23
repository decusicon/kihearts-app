class DashboardController {
    static async index(req, res) {
        res.render("pages/dashboard", {
          title: "Dashboard",
        });
    }
}

module.exports = DashboardController;