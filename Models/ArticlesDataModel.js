const mongoose = require("mongoose");
const userDataModel = require("./usersDataModel");

const articleData = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  articleTxt: { type: String, required: true },
  articleTime: { type: Date, required: true },
  nLike: [{ type: mongoose.Types.ObjectId, ref: "articlesLikes" }],
  nComments: [{ type: mongoose.Types.ObjectId, ref: "articlesComment" }],
  author: { type: mongoose.Types.ObjectId, required: true, ref: "userData" },
});

/**
 * to check if refernce id exist
 */
articleData.path("author").validate(async (value) => {
  return await userDataModel.findById(value);
}, "Something Want Wrong");

module.exports = mongoose.model("ArticleData", articleData);
