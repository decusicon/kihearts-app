const Joi = require('joi');
const path = require('path')
const cryptoRandomString = require('crypto-random-string');

class UserController {
    async index(req, res, next) {
        try {
            return res.render("pages/myaccount", { title: "My Account" });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const user = req.user;

            const validationSchema = Joi.object({
                firstname: Joi.string().trim().required(),
                lastname: Joi.string().trim().required(),
                nickname: Joi.string().trim().required(),
                email: Joi.string().trim().email().required(),
                phoneNumber: Joi.number().integer().required(),
            });

            const valid = await validator(req.body, validationSchema);

            user.firstname = valid.firstname;
            user.lastname = valid.lastname;
            user.nickname = valid.nickname;
            user.email = valid.email;
            user.phoneNumber = valid.phoneNumber;

            await user.save();

            req.flash("success", "Success! You've just updated your account.");

            return res.redirect(req.header("Referer"));

        } catch (error) {
            next(error);
        }
    }


    async updateDetail(req, res, next) {
        try {
            const user = req.user;

            const validationSchema = Joi.object({
                country: Joi.string().trim().required(),
                state: Joi.string().trim().required(),
                city: Joi.string().trim().required(),
                postalcode: Joi.string().trim().optional(),
                homeAddress: Joi.string().trim().required(),
                // check for next of kin's error
                next_firstname: Joi.string().trim().required(),
                next_lastname: Joi.string().trim().required(),
                next_relationship: Joi.string().trim().required(),
                next_email: Joi.string().trim().email().required(),
                next_phoneNumber: Joi.number().integer().required(),
                next_country: Joi.string().trim().required(),
                next_state: Joi.string().trim().required(),
                next_city: Joi.string().trim().required(),
                next_postalcode: Joi.string().trim().optional(),
                next_homeAddress: Joi.string().trim().required(),
            });

            const valid = await validator(req.body, validationSchema);


            user.country = valid.country;
            user.state = valid.state;
            user.city = valid.city;
            user.postalcode = valid.postalcode;
            user.homeAddress = valid.homeAddress;
            user.nextOfKin = {
                firstname: valid.next_firstname,
                lastname: valid.next_lastname,
                relationship: valid.next_relationship,
                email: valid.next_email,
                phoneNumber: valid.next_phoneNumber,
                country: valid.next_country,
                state: valid.next_state,
                city: valid.next_city,
                postalcode: valid.next_postalcode,
                homeAddress: valid.next_homeAddress,
            }

            await user.save();

            req.flash("success", "Success! You've just updated your account details.");

            return res.redirect(req.header("Referer"));

        } catch (error) {
            next(error);
        }
    }

    async updatePassword(req, res, next) {
        try {
            const user = req.user;

            const validationSchema = Joi.object({
                current_password: Joi.string().trim().required().min(6),
                password: Joi.string().trim().required().min(6),
                re_password: Joi.ref('password'),
            });

            const valid = await validator(req.body, validationSchema);

            if (! await user.passwordCheck(valid.current_password)) {
                req.flash('error', 'Wrong password');
                return res.redirect(req.header("Referer"));
            }

            user.password = valid.password;

            await user.save();

            req.flash("success", "Success! You've just updated your password.");

            return res.redirect(req.header("Referer"));

        } catch (error) {
            next(error);
        }
    }

    async updateAvatar(req, res, next) {
        try {
            const user = req.user;

            if (!req.files.avatar) {
                return res.redirect(req.header("Referer"));
            }

            let avatar = req.files.avatar;

            const fileName = cryptoRandomString({ length: 64, type: 'url-safe' }) + path.extname(avatar.name);

            avatar.mv(`${storage_path('app/public/profile-photos')}/${fileName}`);

            user.avatar = fileName;

            await user.save();

            req.flash('success', 'Profile update successfully');

            return res.redirect(req.header("Referer"));
        } catch (error) {
            next(error);
        }
    }

    async updateBank(req, res, next) {
        try {
            const user = req.user;

            const validationSchema = Joi.object({
                bank: Joi.string().trim().required(),
                accountName: Joi.string().trim().required(),
                accountNumber: Joi.number().integer().required(),
            });

            const valid = await validator(req.body, validationSchema);

            user.bankDetails = {
                bank : valid.bank,
                accountName : valid.accountName,
                accountNumber : valid.accountNumber,
            }

            await user.save();

            req.flash("success", "Success! You've just updated your bank information.");

            return res.redirect(req.header("Referer"));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
