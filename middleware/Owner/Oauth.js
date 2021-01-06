const jwt = require("jsonwebtoken");
const Owner = require("../../models/Owner");
const Oauth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const owner = await Owner.findOne({
            _id: decoded._id,
            'tokens.token': token
        });

        if (!owner) {
            throw new Error();
        }
        req.owner = owner;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({
            error: "Please Authenticate"
        })
    }
}
module.exports = Oauth