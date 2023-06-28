const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    jwt.verify(req.cookies['access-token'], process.env.JWT_SECRET, (err, decoded) => {
        if (err) next(err);
        else {
            req.loginId = decoded.Userid;   // Add to req object
            next();
        }
    });
}