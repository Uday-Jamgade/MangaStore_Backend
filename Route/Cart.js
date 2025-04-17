const express = require("express");
const router = express.Router();
const User = require("../DB/User");
const {authenticateToken}=require("./UserAuth");

router.put("/add-cart",authenticateToken,async(req,res)=>{
    try{
      const {bookid,id}=req.headers;
    await User.findByIdAndUpdate(id,{
        $push: {Cart:bookid},
    });

    return res.json({
        status : "succes",
        message:"book added to cart"
    })
}catch(error){
    return res.status(500).json({message:"server error "})
}
})

router.put("/remove-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {bookid}= req.params;
        const {id}=req.headers;
    await User.findByIdAndUpdate(id,{
        $pull: {Cart:bookid},
    });

    return res.json({
        status : "succes",
        message:"book Remove From cart"
    })
}catch(error){
    return res.status(500).json({message:"server error "})
}
})
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      if (!id) {
        return res.status(400).json({ message: "User ID is missing" });
      }
  
      const userData = await User.findById(id).populate("Cart");
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const cart = userData.Cart.reverse();
  
      return res.json({
        status: "success",
        data: cart
      });
    } catch (error) {
      console.error('Error fetching user cart:', error);
      return res.status(500).json({ message: "Server error" });
    }
});  

module.exports = router;