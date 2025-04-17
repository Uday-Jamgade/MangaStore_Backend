const express = require("express");
const router = express.Router();
const User = require("../DB/User");
const Order = require("../DB/Order")
const {authenticateToken}=require("./UserAuth");

router.post("/place-order",authenticateToken, async (req,res)=>{
   
try {
    const {id} = req.headers;
    const {order}= req.body;

for( const orderData of order){
 
    const newOrder =  new Order({user: id,book: orderData._id});
    const orderDataFromDb = await newOrder.save();
    await User.findByIdAndUpdate(id, {
        $push: {order: orderDataFromDb._id}
    })
    await User.findByIdAndUpdate(id,{
        $pull: {Cart: orderData._id }
    })
    
}
return res.status(200).json({
    status: "Success",
    message:"Order Placed Successfuly"
})
} catch (error) {
    return res.status(500).json({message:"server error "})
}
})


router.get("/get-order-history",authenticateToken, async (req,res)=>{
   
    try {
        const {id} = req.headers;    
        const userData =await User.findById(id).populate({
            path:"order",
            populate:{path :"books"}
        })

        const orderData = userData.order.reverse();
        
        
    
    return res.status(200).json({
        status: "Success",
        data: orderData
    })
    
    } catch (error) {
        return res.status(500).json({message:"server error "})
    }
    
    })

    router.get("/get-all-order",authenticateToken, async (req,res)=>{
   
        try {
            const userData = await Order.find().populate({
                path:"books"
            })
            .populate({
                path:"user"
            })
            .sort({createdAt: -1})
        
        return res.json({
            status: "Success",
            data: userData
        })
        
        } catch (error) {
            return res.status(500).json({message:"server error "})
        }
        
        })

        router.put("/update-order",authenticateToken, async (req,res)=>{
            try{
            const {id}= req.headers;
            await Order.findByIdAndUpdate(id,{
                status:req.body.status
            })

            return res.json({
            status: "Success",
            message: " updated successfully"
        })

        }catch (error) {
            return res.status(500).json({message:"server error "})
        }
        })


        module.exports=router;