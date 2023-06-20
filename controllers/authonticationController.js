const mongoose = require("mongoose");
const {validationResult} = require("express-validator")

const usersDataModel = require("../Models/usersDataModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

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

    userData.save().then(() => {
        res.json({message: "added successfully"});
    }).catch(error => next(error))
};
