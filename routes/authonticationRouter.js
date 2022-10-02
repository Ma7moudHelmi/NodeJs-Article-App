const express = require("express");
const router = express.Router();
const controllers = require("../controllers/authonticationController");

router.post("/login", controllers.addLogin);
router.post("/register", controllers.register);

module.exports = router;