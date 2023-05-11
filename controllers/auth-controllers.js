const User = require("../models/User-model")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

const register = async (req, res)=> {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SEC).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

const login =  async (req, res)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(401).json("Wrong credentials")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password && res.status(401).json("Wrong credentials")

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
        {expiresIn:"7d"})

        const { password, ...others} = user._doc

        res.status(200).json({...others, accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {register, login}