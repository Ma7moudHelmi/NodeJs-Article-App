const mongoose = require("mongoose");
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
require('dotenv').config()
// const cookieParser = require("cookie-parser");

const usersDataModel = require("../Models/usersDataModel");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});
transporter.verify().then(() => "true").catch((err) => {
    throw new Error("transporter ERROR" + err.message)
});

exports.addLogin = (req, res, next) => {
    let result = validationResult(req);
    let token;
    if (!result.isEmpty()) {
        let message = result.array()
            .reduce((current, second) => current + second.msg + " ", "")
        let errorObject = new Error(message);
        errorObject.status = 422;
        throw errorObject
    }
    usersDataModel
        .findOne({email: req.body.email, password: req.body.password})
        .then((data) => {
            if (!data) throw new Error("Incorrect email or password");
            token = jwt.sign({Userid: data._id},
                "secretKey", {expiresIn: "1h"});
            res.cookie("access-token", token, {
                httpOnly: true
            }).status(201).json({status: data, token: token});
        })
        .catch((error) => next(error));
};
exports.register = (req, res, next) => {
    let userData = new usersDataModel({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    });
    userData.save().then((data) => {

        return transporter.sendMail({
            from: `Blog <e*****@gmail.com>`, // sender address
            to: req.body.email, // list of receivers
            subject: "sign up success", // Subject line
            text: "There is a new article. It's about sending emails, check it out!", // plain text body
            html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
        }).then(() => {
            res.json({message: "added successfully"});

        })
    }).catch(error => next(error))


};
