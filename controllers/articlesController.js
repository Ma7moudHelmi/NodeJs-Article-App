const mongoose = require("mongoose");

const articleDataModel = require("../Models/ArticlesDataModel");

/**
 * List Article data from database
 */
exports.getArticles = (req, res, next) => {
    articleDataModel
        .find({})
        .then((data) => {
            res.json({message: "List Of Articles", data});
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
        author: req.loginId,
    });
    articleData
        .save()
        .then((data) => {
            res.json({message: "Add Successfully"});
        })
        .catch((error) => next(error));
};

/**
 * update Article data to database
 */

exports.updateArticles = (req, res, next) => {
    articleDataModel
        .findById(req.params.blogId)
        .then((data) => {
            if (data === null) throw new Error("invalid id");
            if (req.loginId !== data.author.toString()) throw new Error("not authorized");
            //   console.log(req.loginId);
            data.articleTxt = req.body.articleTxt;
            return data.save();
        })
        .then((data) => {
            res.json({message: "Updated Successfully"});
        })
        .catch((error) => next(error));
};

/**
 * delete Article data to database
 */

exports.deleteArticles = (req, res, next) => {
    articleDataModel
        .findOneAndDelete({_id: req.params.blogId, author: req.loginId})
        .then((data) => {
            if (data==null) throw new Error("Not permitted to delete articles");
            res.status(200).json({message: "delete article"});
        })
        .catch((error) => next(error));
};
