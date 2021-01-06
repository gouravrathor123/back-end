const jwt = require("jsonwebtoken");
const Employee = require("../../models/Employee");
const Eauth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const employee = await Employee.findOne({
            _id: decoded._id,
            'tokens.token': token
        });

        if (!employee) {
            throw new Error();
        }
        req.token = token;
        req.employee = employee;
        next();
    } catch (err) {
        res.status(401).send({
            error: "Please Authenticate"
        })
    }
}

module.exports = Eauth