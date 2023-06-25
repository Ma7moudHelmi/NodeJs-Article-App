const express = require("express");
const router = express.Router();
const controllers = require("../controllers/articlesController");
const authMW = require("./../authorization/authorization")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router
    .route("/Articles")
    .get(controllers.getArticles)
    .post(authMW, controllers.addArticles);
router.put('/Articles/:blogId',authMW, controllers.updateArticles);
router.delete('/Articles/:blogId',authMW,controllers.deleteArticles);

module.exports = router;
