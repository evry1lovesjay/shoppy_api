const Order = require("../models/order-model")

const createOrder = async(req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateOrder = async (req,res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedOrder)
    }

    catch (error) {
        res.status(500).json(error)
    }
}

const deleteOrder =  async (req,res) => {
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted Successfully.!!!!!!")
    }

    catch (error) {
        res.status(500).json(error)
    }
}

const getUserOrder = async (req,res) => {
    try{
        const Orders = await Order.find({userId: req.params.userId})
        res.status(200).json(Orders)
    }

    catch (error) {
        res.status(500).json(error)
    }
}

const getAllOrders = async (req,res) => {
    try{
        const Orders = await Order.find()
        res.status(200).json(Orders)
    }

    catch (error) {
        res.status(500).json(error)
    }
}

const getMonthlyIncome = async (req,res)=>{
    const productId = req.query.pid
    const date = new Date()
    const lastMonth =  new Date(date.setMonth(date.getMonth()-1))
    const previousMonth =  new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try{
        const income = await Order.aggregate([
            {
                $match: {
                createdAt: {$gte: previousMonth}, 
                ...(productId && {
                products:{$elemMatch: {productId:productId}}
                    }),
                },
            },
            {$project:{
                month: {$month : "$createdAt"},
                sales:"$amount"
            }},
            {
                $group:{
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ])
        res.status(200).json(income)
    }

    catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders, getMonthlyIncome}