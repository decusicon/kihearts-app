const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    avatar: { type: String, default: null },
    created_at: { type: Number, default: Date.now() },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    postalcode: { type: Number, required: false },
    homeAddress: { type: String, required: true },
    nextOfKin: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        relationship: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        postalcode: { type: Number, required: false },
        homeAddress: { type: String, required: true },
    },
    paid: { type: Number, default: false },
    bankDetails: {
        accountName: { type: String, default: "" },
        accountNumber: { type: Number, default: null },
        bank: { type: String, default: "" },
    },
});

userSchema.pre('save', async function (next) {

    try {
        let user = this;

        if (!user.isModified('password')) return next();

        let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);
        return next()

    } catch (err) {
        return next(err);
    }
});

// userSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

module.exports.schema = userSchema;
module.exports.model = mongoose.model("Users", userSchema);
