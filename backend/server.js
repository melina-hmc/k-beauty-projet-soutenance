const dotenv = require('dotenv').config();
const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const cookieParser = require ("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const orderRoute = require("./routes/orderRoute");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
 
// MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));
app.use(
    cors({
        origin: ["http://localhost:9000"],
        credentials: true,
    })
);


// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/order", orderRoute);

app.get("/" , (req, res) => {
    res.send("Home Page...")
})

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 9001;

mongoose
    .connect(process.env.BDD_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))