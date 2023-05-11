const Order = require("../models/order-model")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../utils/verifyToken")
const {createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders, getMonthlyIncome} = require("../controllers/order-controllers")

const router = require("express").Router()

// CREATE ORDER
router.post("/", verifyToken, createOrder)

//UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, updateOrder)

//DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, deleteOrder)

//GET USER'S ORDERS
router.get("/find/:userId",verifyTokenAndAuthorization, getUserOrder)

//GET ALL ORDERS
router.get("/",verifyTokenAndAdmin, getAllOrders)

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome)

module.exports = router