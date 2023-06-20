const mongoose = require("mongoose");
const userDataModel = require("./usersDataModel");


const comments= mongoose.Schema({text: 'string',authorId:{type:mongoose.Types.ObjectId ,ref:userDataModel}})

const articleData = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  articleTxt: { type: String, required: true },
  articleTime: { type: Date, required: true },
  nComments: [comments],
  author: {type: mongoose.Types.ObjectId ,ref: userDataModel},
});

/**
 * to check if reference id exist
 */
// articleData.path("author").validate(async (value) => {
//   return await userDataModel.findById(value);
// }, "Something Want Wrong");

module.exports = mongoose.model("ArticleData", articleData);
