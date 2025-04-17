const mongoose =require("mongoose");

const User= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    avtar:{
        type:String,
        default:"https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    // favourate:[{
    //     type:mongoose.Types.ObjectId,
    //     ref:"books"
    // }],
    Cart:[{
        type:mongoose.Types.ObjectId,
        ref:"Book"
    }],
    order:[{
        type:mongoose.Types.ObjectId,
        ref:"order"
    }],


},{timestamps:true}

)

module.exports= mongoose.model("user",User)