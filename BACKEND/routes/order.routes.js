const router = require('express').Router();
const Order = require('../models/Oders');
const Product = require('../models/Product');
const { varifyToken, varifyTokenAndAutharaization, varifyTokenAndAdmin } = require('./varifyToken.routes')


// CREATE
router.post("/", varifyTokenAndAutharaization, async (req, res) => {
    // console.log("afafdsd", req.body);
    try {
        const userId = req.user.id;
        // console.log(productId);

        const productData = await Product.findById(req.body.product)
        if(!productData){
            res.status(404).json({message: "product not found"});
            return;
        }
        // console.log(productData);
        const newOrder = await Order.create({ 
            userId:userId,
            product:req.body.product,
            quantity:req.body?.quantity,
            amount:req.body.amount,
            address:req.body.address
        })

        res.status(200).json(newOrder);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// // UPDATE PRODUCT
router.put("/:id", varifyToken, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(404).json(err)
    }
});
// DELETE PRODUCT
router.delete("/:id", varifyToken, async (req, res) => {
    try {
        console.log("id for delete:", req.params.id);
        const data = await Order.findById(req.params.id)
        const deleted = await Order.findByIdAndDelete(req.params.id);
        console.log(data);
        // res.status(200).json("Order has been deleted");
        res.json(deleted)
    } catch (err) {
        return res.status(500).json(err);
    }
});
// GET ONE PRODUCT
router.get("/find",  varifyTokenAndAutharaization, async (req, res) => {
    const userId = req.user.id;
    try {
        const setOrder = await Order.find({ userId: userId }).populate('product');
        res.status(200).json(setOrder);
        console.log(setOrder);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// GET ALL PRODUCTS
router.get("/all", varifyTokenAndAutharaization, async (req, res) => {
    // console.log("npm", req.body);
    const userId = req.user.id;
    try {
        // console.log("GET ALL orders");
        const orders = await Order.find().populate('product');
        console.log({ orders });
        res.status(200).json(orders);

    } catch (err) {
        return res.status(500).json(err);
    }
});
//GET MONTHLY INCOME
router.get("/income", varifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    console.log(req.body);
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router