const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {
    console.log(req.body); // Log the request body to see its structure
    const hashpass = CryptoJS.AES.encrypt(req.params.password, process.env.PASS_SEC)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashpass.toString(),
    });
    // console.log(User);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
        // return res.json({ url: savedUser.id })
    } catch (err) {
        res.status(500).json(err);
        console.log("error", err);
    }
});

// LOGIN PAGE
router.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const setUser = await User.findOne({ username: req.body.username });

        // If user is not found or password is incorrect, send an error response
        if (!setUser) {
            console.log("no user");
            return res.status(404).json("You are not registered...😣");
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            setUser.password,
            process.env.PASS_SEC
        );
        const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // If password doesn't match, send an error response
        if (orginalPassword === req.body.password) {
            console.log("password incorrect");
            return res.status(404).json("You are not registered...😣");
        }
        const accessToken = jwt.sign({
            id: setUser.id,
            isAdmin: setUser.isAdmin
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
        // If both username and password are correct, send user details
        const { password, ...others } = setUser._doc;
        res.status(200).json({ ...others, accessToken, setUser: setUser._id});
        // return res.json({ url: setUser.url })
        console.log(setUser._id);
    } catch (err) {
        // Handle any other errors
        console.log("error", err);
        res.status(500).json(err);
    }
});

// LOG OUT 



module.exports = router