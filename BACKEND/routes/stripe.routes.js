const { create } = require("../models/Cart");
const Product = require("../models/Product");

const router = require("express").Router();
// const { PaymentIntent } = require('stripe');
const stripe = require("stripe")('sk_test_51OoMhBSHX4xukfmPFMc60gvk6KoRO3yqOS7pF6vFugZbu64ta15PQPRBioqVEe6leJ90hlKcuzkfYcZX9eGGbBz900VQLKS0yv');

router.post("/payment", (req, res) => {
    console.log(req.body.amount);
    console.log(req.body.tokenId);
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.price,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            console.error("Stripe error:", stripeErr);
            res.status(500).json({ error: "Stripe error", message: stripeErr.message });
        } else {
            console.log("Stripe response:", stripeRes);
            res.status(200).json(stripeRes);
        }
    });
});




router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "USD",
            amount,
            description: "payment intent",
            automatic_payment_methods: { enabled: true },
        });

        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });


    }
});


router.post("/create-checkout-session", async (req, res) => {
    // console.log(req.body);
    const { name, amount, quantity } = req.body; // Destructure the needed properties
    console.log("product name is", name);
    console.log("Request body:", req.body);

    try {
        // Create a price with the necessary product data
        const price = await stripe.prices.create({
            currency: "usd",
            unit_amount: amount, // Use the amount from the request body
            product_data: {
                name: name, // Use the name of the product from the request body
            },
        });

        console.log({ price });

        // Create a checkout session using the created price
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id, // Use the ID of the created price
                    quantity: quantity, // Use the quantity from the request body
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });

        return res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return res.status(500).json({ error: "Error creating checkout session", message: error.message });
    }
});



module.exports = router;