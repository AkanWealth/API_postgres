const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req, res, next) => {
    try {
        const Token = req.headers["authorization"].split(" ")[1];
        if (!Token) {
            return res.status(403).json("Not Authorize");
        }
        // const token = authHeader.split(" ")[1];
        const payload = jwt.verify(Token, process.env.SECRET);
        req.user = payload.user;
    } catch (error) {
        console.log(error.message);
        return res.status(403).json("Unauthorize request");
    }
    next();
};
//module.exports = (req, res, next) => {
//     const authHeader = req.headers["authorization"];

//     if (authHeader) {
//         const token = authHeader.split(" ")[1];

//         jwt.verify(token, process.env.SECRET, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }

//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };