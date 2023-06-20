const express = require("express");
const router = express.Router();
const controllers = require("../controllers/authonticationController");
const {body, check} = require("express-validator")
router.post("/login", check("email").isEmail().withMessage("invalid email"),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
    }).withMessage("invalid password"), controllers.addLogin);
router.post("/register", body("fullName").isAlpha(),
    body("email").isEmail().withMessage("invalid Name"),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
    }).withMessage("invalid password"),
    controllers.register);

module.exports = router;