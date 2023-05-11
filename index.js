const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
const usersRoute = require("./routes/users-routes")
const authsRoute = require("./routes/auth-routes")
const productsRoute = require("./routes/product-routes")
const cartsRoute = require("./routes/cart-routes")
const ordersRoute = require("./routes/order-routes")
const stripeRoute = require("./routes/stripe-routes")
const cors = require("cors")

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DBConnection succesful!"))
.catch((err)=>
    console.log(err)
)

app.use(express.json())
app.use(cors())

app.use("/api/auth", authsRoute)
app.use("/api/users", usersRoute)
app.use("/api/products", productsRoute)
app.use("/api/carts", cartsRoute)
app.use("/api/orders", ordersRoute)
app.use("/api/checkout", stripeRoute)

app.listen(process.env.PORT || 7000, ()=>{
    console.log("Backend server running Perfectly!!")
})