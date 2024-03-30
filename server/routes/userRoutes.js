const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
router.get("/getuser", userController.getUsers)
router.post("/adduser", userController.createUsers)
module.exports = router;