const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../utils/verifyToken")
const {createCart, updateCart, deleteCart, getUserCart, getAllCarts} = require("../controllers/cart-controllers")

const router = require("express").Router()

// CREATE CART

router.post("/", verifyToken, createCart)

//UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, updateCart)

//DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, deleteCart)

//GET USER CART
router.get("/find/:userId",verifyTokenAndAuthorization, getUserCart)

//GET ALL CARTS
router.get("/",verifyTokenAndAdmin, getAllCarts)


module.exports = router