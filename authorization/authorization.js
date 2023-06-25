const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    jwt.verify(req.cookies['access-token'], "secretKey", (err, decoded) => {
        if (err) next(err);
        else {
            req.loginId = decoded.Userid;   // Add to req object
            next();
        }
    });
}