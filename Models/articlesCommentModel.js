const mongoose = require("mongoose");
const userDataModel = require("./usersDataModel");
const ArticlesDataModel = require("./ArticlesDataModel");

const articlesCommentModel = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  commentTxt: { type: String, required: true },
  commTime:Date,
  authorId: { type: mongoose.Types.ObjectId, ref: "userData" },
  articleId: { type: mongoose.Types.ObjectId, ref: "ArticleData" },
});

/**
 * to check if refernce id exist
 */

 articlesCommentModel.path("authorId").validate(async (value) => {
  return await userDataModel.findById(value);
}, "Something Want Wrong");

articlesCommentModel.path("articleId").validate(async (value) => {
  return await ArticlesDataModel.findById(value);
}, "Something Want Wrong");

module.exports = mongoose.model("articlesComment", articlesCommentModel);
