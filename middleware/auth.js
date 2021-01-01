const jwt = require('jsonwebtoken');
const Employee = require("../models/Employee");
const Owner = require("../models/Owner");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Owner.findOne({
            _id: decoded._id,
            'tokens.token': token
        });


    } catch (err) {
        res.status(401).send({
            error: 'Please authenticate.'
        });
    }
}

module.exports = auth