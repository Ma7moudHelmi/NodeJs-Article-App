const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.route("/user").get().post().put().delete();
module.exports = router;
