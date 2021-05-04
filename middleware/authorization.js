const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req, res, next) => {
    try {
        const Token = req.headers["authorization"];
        if (!Token) {
            return res.status(403).json("Not Authorize");
        }

        const payload = jwt.verify(Token, process.env.SECRET);
        req.user = payload.user;
    } catch (error) {
        console.log(error.message);
        return res.status(403).json("Unauthorize request");
    }
    next();
};