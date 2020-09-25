class AdvertisementController {
    async index(req, res) {
        res.render("pages/advertise", { title: "Advertise" });
    }
}

module.exports = new AdvertisementController();