const express = require("express");
require("./DB/config");
const User = require("./Route/User");
const Book=require("./Route/Book");
const Cart = require("./Route/Cart");
const Order = require("./Route/Order")
const cors = require("cors")

const app = express();
app.use(cors())
require("dotenv").config();
app.use(express.json())


app.use("/api/v1",User);
app.use("/api/v1",Book);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);

// app.get("/",(req,res)=>{
//     console.log("hello"); 
// })

app.listen(process.env.PORT,()=>{
    console.log(`server run on  http://localhost/${process.env.PORT}`);   
})