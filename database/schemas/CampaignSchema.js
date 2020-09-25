const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");


const campaignSchema = mongoose.Schema(
	{
		userId: { type: String, required: true },
		title: { type: String, required: true },
		category: { type: String, required: true },
		subCategory: { type: String, required: true },
		reason: { type: String, required: true },
		amount: { type: Number, required: true },
		stage: { type: String, default: "active" },
		coins: {
			target: { type: Number, default: 20000 },
			total: { type: Number, default: 0 },
		},
		photos: [],
	},
	{ timestamps: true }
);


campaignSchema.plugin(mongoose_delete, { deletedAt: true });
campaignSchema.plugin(mongoose_delete, {
	overrideMethods: ["count", "countDocuments", "find"],
});


module.exports.schema = campaignSchema;
module.exports.model = mongoose.model("Campaigns", campaignSchema);
