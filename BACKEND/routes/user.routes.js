const router = require('express').Router();
const { response, json } = require('express');
const User = require('../models/User');
const { varifyToken, varifyTokenAndAutharaization, varifyTokenAndAdmin } = require('./varifyToken.routes')
const CryptoJS = require('crypto-js');

// UPDATE USER
router.put("/:id", varifyToken, async (req, res) => {
    const hash = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC);
    if (req.body.password) {
        req.body.password = hash.toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(404).json(err)
    }
});
// DELETE USER
router.delete("/:id", varifyTokenAndAutharaization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
});
// GET ONE USER
router.get("/find/:id", varifyTokenAndAutharaization, async (req, res) => {

    try {
        const setUser = await User.findById(req.params.id);
        const { password, ...others } = setUser._doc
        res.status(200).json(others);
    } catch (err) {

        return res.status(500).json(err.message);
    }
});
// GET ALL USERS
router.get("/all", varifyTokenAndAutharaization, async (req, res) => {
    const query = req.query.new;
    try {
        const allUsers = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        res.status(200).json(allUsers);
    } catch (err) {
        return res.status(500).json(err);
    }
});
// GET USER STATS
router.get("/stats", varifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                },
            },
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router