const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../utils/verifyToken")
const {updateUser, deleteUser, getUser, getAllUsers, getUserStats} = require("../controllers/users-controllers")

const router = require("express").Router()

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser)

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser)

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, getUser)

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, getAllUsers)

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, getUserStats)

module.exports = router