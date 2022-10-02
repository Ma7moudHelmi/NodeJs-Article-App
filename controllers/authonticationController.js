const mongoose = require("mongoose");

const usersDataModel = require("../Models/usersDataModel");

exports.addLogin = (req, res, next) => {
  usersDataModel
    .find({ email: req.body.email, password: req.body.password })
    .then((data) => {
      if (data==null) throw new Error("Invalid Login");
      res.json(data);
    })
    .catch((error) => next(error));

  // res.send("Login Successfully");
};
exports.register = (req, res, next) => {
  let userData = new usersDataModel({
    _id:new mongoose.Types.ObjectId(),
    fullName:req.body.fullName,
    email:req.body.email,
    password:req.body.password

  });

  userData.save().then(()=>{
    res.json({message:"added successfully"});
  }).catch(error=>next(error))
};
