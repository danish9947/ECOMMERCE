const router = require('express').Router();
const Product = require('../models/Product');
const { varifyToken, varifyTokenAndAutharaization, varifyTokenAndAdmin } = require('./varifyToken.routes')


// CREATE
router.post("/", varifyTokenAndAdmin, async (req, res) => {
    console.log(req.body);
    const newProduct = new Product({
        title: req.body.values.title,
        desc:req.body.values.desc,
        price: req.body.values.price,
        img: req.body.image
    });
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// // UPDATE PRODUCT
router.put("/:id", varifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json("error", err)
    }
});

// DELETE PRODUCT
router.delete("/:id", varifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
});
// GET ONE PRODUCT
router.get("/find/:id", varifyTokenAndAutharaization, async (req, res) => {

    try {
        const setPrduct = await Product.findByI(req.params.id);
        res.status(200).json(setPrduct);
    } catch (err) {
        return res.status(500).json(err);
    }
});
// GET ALL PRODUCTS
router.get("/all",varifyToken,  async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1)
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router