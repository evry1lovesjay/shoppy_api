const {verifyTokenAndAdmin } = require("../utils/verifyToken")
const {createProduct, updateProduct, deleteProduct, getProduct, getAllProducts} = require("../controllers/product-controllers")

const router = require("express").Router()

// CREATE PRODUCT

router.post("/", verifyTokenAndAdmin, createProduct)

//UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, updateProduct)

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, deleteProduct)

//GET PRODUCT
router.get("/find/:id", getProduct)

//GET ALL PRODUCTS
router.get("/", getAllProducts)

module.exports = router
