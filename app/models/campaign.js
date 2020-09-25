const Model = require("@schemas/CampaignSchema").model;


class Campaign extends Model {
  
  get photos() {
    const photos = super.photos;

    if(_.isEmpty(photos)) {
      return [];
    }

    return _.map(photos, (photo) => `storage/campaign-photos/${photo}`);
  }

  set photos(value) {
    super.photos = value;
  }

	get hasPhotos() {
		return !_.isEmpty(super.photos);
	}
}

module.exports = Campaign;

