const express = require("express");
const passport = require("passport");
const {body, check} = require("express-validator")

const controllers = require("../controllers/authonticationController");

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render("html")
})

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


router.get(
    "/auth/google",
    passport.authenticate("google", {scope: ["email", "profile"]})
);
router.get(
    process.env.GOOGLE_CALLBACK_URL,
    passport.authenticate("google", {session: false}),
    (req, res,next) => {
        res.redirect('/profile')
    }
);
router.get("/profile", (req, res,next) => {
    res.send("Welcome");
})
module.exports = router;