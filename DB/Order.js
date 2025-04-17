const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    books:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    status:{
    type:String,
    default:"Order Placed",
    enum:["Order Placed"," Out for Delivery","Deliverd","Cancled"]
    }
},
{timestamps:true}
)

module.exports=mongoose.model("order",order)