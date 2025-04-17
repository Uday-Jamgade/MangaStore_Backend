
const express = require("express");
const router = express.Router();
const User = require("../DB/User");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const {authenticateToken}=require("./UserAuth");

router.post("/Sign-up", async (req,res)=>{
    try {
        const {username,email,password,address} = req.body;
   
        const existingUser= await User.findOne({username:username});
        if(existingUser){
            return res.status(400).json({message:"User Name Already exist"})
        }

        const existingEmail= await User.findOne({email:email});
        if(existingEmail){
            return res.status(400).json({message:"Email Already exist"})
        }

        const hashpass= await bcrypt.hash(password,10);
 
        const newUser = new User({
            username:username,
            email:email,
            password:hashpass,
            address:address
        })

        await newUser.save();
        return res.status(200).json({message:"User Sign-up Completed"})
    } catch (error) {
        return res.status(500).json({message:"server error "})
    }
})

router.post("/Sign-in",async (req,res)=>{
    try {
        const {username,password}= req.body;
        const existingUser= await User.findOne({username:username});
        if(!existingUser){
            return res.status(400).json({message:"Invalid Credential"});
        }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            const authClaims=[{
                name:existingUser.username,
                role:existingUser.role
            }]
            if(data){
                const token=jwt.sign({authClaims},"BookStore123",{expiresIn:"30d"});
                res.status(200).json({
                    id:existingUser._id,
                    role:existingUser.role,
                    token:token,
                });
            }else{
                res.status(200).json({message:"invald Password"})
            }
        })

        
    } catch (error) {
        return res.status(500).json({message:"server error "})
    }
})

router.get("/get-user-information",authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const data =await User.findById(id).select('-password');
        return res.status(200).json(data);
    }catch(error) {
        return res.status(500).json({message:"server error"});
    }
})

router.put("/update-address",authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address Updated Succesfully"});
    }catch(error) {
        return res.status(500).json({message:"server error"});
    }
})



module.exports = router;