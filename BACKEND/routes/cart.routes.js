const router = require('express').Router();
const Cart = require('../models/Cart');
const { varifyToken, varifyTokenAndAutharaization, varifyTokenAndAdmin } = require('./varifyToken.routes')
const setUser = require('./auth.routes');
const Product = require('../models/Product');

// CREATE
// router.post("/", varifyToken, async (req, res) => {
//     console.log("afafdsd", req.body);
//     try {
//         const newCart = new Cart(req.body);
//         await newCart.save();

//         const pro = await Product.findByIdAndUpdate(
//             req.body.products,
//             { $push: { products: newCart.products } },
//             { new: true }
//             );
//             console.log(pro);
//         res.status(200).json(savedCart);
//     } catch (err) {
//         return res.status(500).json(err.message);
//     }
// })

router.post("/", varifyTokenAndAutharaization, async (req, res) => {
    console.log("afafdsd", req.body);
    try {
        const userId = req.user.id;
        // console.log(productId);

        const productData = await Product.findById(req.body.product)
        if(!productData){
            res.status(404).json({message: "product not found"});
            return;
        }
        console.log(productData);
        const newCart = await Cart.create({ 
            userId:userId,
            product:req.body.product,
            amount:productData.price,
            address:req.body.address
        })

        res.status(200).json(newCart);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// // UPDATE CART
router.put("/:id", varifyTokenAndAutharaization, async (req, res) => {
    try {
        // const userId = req.user.id;
        const cartData = await Cart.findById(req.params.id);
        console.log("CartData: ",cartData);

        const productData = await Product.findById(cartData.product);

        if(!cartData){
            res.status(404).json({message: "Cart not found"});
            return
        }
        if(req.body.quantity == 'increment'){
            const updated = await Cart.findByIdAndUpdate(req.params.id,{
                quantity: cartData.quantity+1,
                amount:cartData.amount + productData.price
            }, {new: true})
            res.status(200).json(updated);
            return;
        }; 
        if(req.body.quantity== 'decrement' && !cartData.quantity <= 1){
            const updated = await Cart.findByIdAndUpdate(req.params.id,{
                quantity:cartData.quantity-1,
                amount:cartData.amount-productData.price
            }, {new: true})
            res.status(200).json(updated)
            return;
        }
    } catch (err) {
        return res.status(404).json(err)
    }
});
// DELETE CART
router.delete("/:productId", varifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        console.log({productId});

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(product => product.productId.toString() !== productId);

        await cart.save();
        console.log(cart);

        res.json({ message: "Product removed from cart successfully", cart });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


// GET ONE CART
router.get("/find",  varifyTokenAndAutharaization, async (req, res) => {
    const userId = req.user.id;
    try {
        const setCart = await Cart.find({ userId: userId }).populate('product');
        res.status(200).json(setCart);
        console.log(setCart);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// GET ALL CARTS
router.get("/all", varifyToken, async (req, res) => {
    try {
        const carts = await Cart.find().populate('product');
        // console.log({ carts });
        res.status(200).json(carts);

    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router