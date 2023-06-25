const usersDataModel = require("./Models/usersDataModel");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("./userModel");
module.exports = (passport) => {
    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/callbacks",
            passReqToCallback: true
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {

                let existUser = await usersDataModel.findOne({email: profile.emails[0].value})
                if (existUser) {
                    return done(null, existUser)
                }
                let userData = new usersDataModel({
                    _id: new mongoose.Types.ObjectId(),
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                });

                await userData.save();
                return done(null, userData);
            } catch (error) {
                return done(error, false)
            }
        }
    ));
}