const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
router.post("/checkuser", userController.checkUsers);
router.post("/adduser", userController.createUsers)
module.exports = router;