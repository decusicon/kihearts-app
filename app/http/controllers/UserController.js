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

            const valid = await req.validate({
				firstname: "required|string",
				lastname: "required|string",
				nickname: "required|string|unique:users,nickname",
				email: "required|string|min:3|email|unique:users,email",
				phoneNumber: "required|string|unique:users,phoneNumber",
			});

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

            const valid = await req.validate({
				country: "required|string",
				state: "required|string",
				city: "required|string",
				postalcode: "present|string",
				homeAddress: "required|string",
				// check for next of kin's error
				next_firstname: "required|string",
				next_lastname: "required|string",
				next_relationship: "required|string",
				next_email: "required|string|min:3|email",
				next_phoneNumber: "required|string",
				next_country: "required|string",
				next_state: "required|string",
				next_city: "required|string",
				next_postalcode: "present|string",
				next_homeAddress: "required|string",
			});

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

            const valid = await req.validate({
				current_password: "required|string|min:6",
				password: "required|string|min:6|confirmed",
			});

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

            const valid = await req.validate({
				bank: "required|string",
				accountName: "required|string",
				accountNumber: "required|string",
			});

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
