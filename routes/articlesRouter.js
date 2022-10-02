const express = require("express");
const router = express.Router();
const controllers = require("../controllers/articlesController");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router
  .route("/Articles")
  .get(controllers.getArticles)
  .post(controllers.addArticles)
  .put(controllers.updateArticles)
  .delete(controllers.deleteArticles);
module.exports = router;
