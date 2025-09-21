const mongoose = require("mongoose");

const Book = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    auther:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    genre:{
        type:String,
    }
   
},
{timestamps:true}
)

module.exports=mongoose.model("Book",Book)