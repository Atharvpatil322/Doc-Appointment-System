const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


//dotenv config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
//const userRouter = require("./routes/userRoutes");
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//  port
const port = process.env.PORT || 8081

// listen port
app.listen(port, (req,res) => {
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white);
});