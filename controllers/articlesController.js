const mongoose = require("mongoose");

const articleDataModel = require("../Models/ArticlesDataModel");

/**
 * List Article data from database
 */
exports.getArticles = (req, res, next) => {
  articleDataModel
    .find({})
    .then((data) => {
      res.json({ message: "List Of Articles", data });
    })
    .catch((error) => next(error));
};

/**
 * add Article data to database
 */
exports.addArticles = (req, res, next) => {
  let articleData = new articleDataModel({
    _id: new mongoose.Types.ObjectId(),
    articleTxt: req.body.articleTxt,
    articleTime: Date(),
    nComments: {text:req.body.nComments,authorId:req.loginId},
    author: req.loginId,
  });
  articleData
    .save()
    .then((data) => {
      res.json({ message: "Add Successfully" });
    })
    .catch((error) => next(error));
};

/**
 * update Article data to database
 */

exports.updateArticles = (req, res, next) => {
  articleDataModel
    .findById(req.body.id)
    .then((data) => {
      if (data == "") throw new Error("invalid id");
      data.articleTxt = req.body.articleTxt;
      return data.save();
    })
    .then((data) => {
      res.json({ message: "Updated Successfully" });
    })
    .catch((error) => next(error));
};

/**
 * delete Article data to database
 */

exports.deleteArticles = (req, res, next) => {
  articleDataModel
    .deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).json({ message: "delete article" });
    })
    .catch((error) => next(error));
};
