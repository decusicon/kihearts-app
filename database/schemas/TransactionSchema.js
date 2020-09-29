const mongoose = require("mongoose")
const mongoose_delete = require("mongoose-delete")

const transactionSchema = mongoose.Schema(
  {
    model_id: { type: String, required: true },
    model_type: { type: String, required: true },
    mode: { type: String, required: true },
    status: { type: String, default: "pending" },
    credit: { type: Number, default: null },
    debit: { type: Number, default: null },
    description: { type: String, required: true },
    meta: {},
  },
  { timestamps: true }
)

//========PLUGINS =====================//
transactionSchema.plugin(mongoose_delete, { deletedAt: true })
transactionSchema.plugin(mongoose_delete, {
  overrideMethods: ["count", "countDocuments", "find"],
})

module.exports.schema = transactionSchema
module.exports.model = mongoose.model("Transactions", transactionSchema)
