const express = require('express');
const app = express();
var cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');
const productRoute = require('./routes/product.routes');
const cartRoute = require('./routes/cart.routes');
const orderRoute = require('./routes/order.routes');
const upload = require('./routes/addImg.routes')
const stripeRoute = require('./routes/stripe.routes')


app.use(cors());

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/image", upload)
app.use("/api/stripe", stripeRoute);

console.log(dotenv);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Succesful...🙂!"))
    .catch((err) => {
        console.log(err);
    });

// test
// app.get("/api/test", (req, res) => {
//     console.log("test is succesful");
// })

app.listen(process.env.PORT || 3344, () => {
    console.log("Backend srver is running...😜!");
})
console.log("");