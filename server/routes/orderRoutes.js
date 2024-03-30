const express = require('express')
const router = express.Router()
const orderController = require("../controllers/orderController")
router.post("/addorder", orderController.createOrder)
router.get("/getorders", orderController.getAllOrders)
router.get("/getorder/:id", orderController.getOrder)
router.put("/updateorder/:id", orderController.updateOrder)
router.delete("/deleteorder/:id", orderController.deleteOrder)
module.exports = router;