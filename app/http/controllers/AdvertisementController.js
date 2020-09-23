class AdvertisementController {
    static async index(req, res) {
        res.render("pages/advertise", { title: "Advertise" });
    }
}

module.exports = AdvertisementController;