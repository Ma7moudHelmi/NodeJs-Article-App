const mongoose = require("mongoose");
const userDataModel = require("./usersDataModel");
const ArticlesDataModel = require("./ArticlesDataModel");

const articlesLikesModel = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  articleId: { type: mongoose.Types.ObjectId, ref: "ArticleData" },
  authorId: { type: mongoose.Types.ObjectId, ref: "userData" },
  likeTime: Date,
});

/**
 * to check if refernce id exist
 */ 

articlesLikesModel.path("authorId").validate(async (value) => {
  return await userDataModel.findById(value);
}, "Something Want Wrong");

articlesLikesModel.path("articleId").validate(async (value) => {
  return await ArticlesDataModel.findById(value);
}, "Something Want Wrong");

module.exports = mongoose.model("articlesLikes", articlesLikesModel);
