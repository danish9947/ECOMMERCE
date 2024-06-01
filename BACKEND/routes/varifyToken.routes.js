const User = require("../models/User");
const jwt = require("jsonwebtoken");

const varifyToken = async (req, res, next) => {
    const headerAuth = req.headers.token
    // console.log(req.headers.token);
    if (headerAuth) {
        const token = headerAuth.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if (err) return res.status(404).json("your not valid")
            req.user = user;
            next();
        })
    } else {
        return res.status(404).json("your not authenticated..!")
    }
};

const varifyTokenAndAutharaization = (req, res, next) => {
    varifyToken(req, res, () => {
        // console.log("..",req.user);
        if (req.user.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(404).json("you are not allowed to do that...🚫🚫🚫")
        }
    });
};
const varifyTokenAndAdmin = (req, res, next) => {
    varifyToken(req, res, () => {
        // console.log("user >>>", req.user);
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(404).json("you are not allowed to do that...🚫🚫");
        }
    });
};

module.exports = {
    varifyToken,
    varifyTokenAndAutharaization,
    varifyTokenAndAdmin
}