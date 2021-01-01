const Owner = require("../models/Owner");

module.exports = {
    add: async function (owner) {
        let result = null;
        try {
            const own = new Owner(owner);
            let ow = await Owner.findOne({
                email: owner.email
            });
            if (ow) {
                throw new Error("Email already registerd");
            } else {
                let result1 = await Owner.create(owner);
                result = await Owner.findOne({
                    _id: result1._id
                });
            }
            const token = await own.generateAuthToken();
            return {
                result,
                token,
                message: "Owner added successfully"
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }
}