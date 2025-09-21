const express = require("express");
const router = express.Router();
const User = require("../DB/User");
const jwt= require("jsonwebtoken");
const Book = require("../DB/Book");
const {authenticateToken}=require("./UserAuth");

router.post("/add-book",authenticateToken,async(req,res)=>{

    try{
      const {id}=req.headers;
      const user =await User.findById(id);

      if(user.role !== "admin"){
       return res.status(400).json({message:"only admin can add and update "})
      }
        const AddBook = new Book({
            url:req.body.url,
            title:req.body.title,
            auther:req.body.auther,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
            category:req.body.category,
            genre:req.body.genre
        })
        await AddBook.save();
        return res.status(200).json({message:"Book Added Succesfully"})
    }catch(error){
        return res.status(500).json({message:"server error "})
    }
   
})

router.put("/update-book",authenticateToken,async(req,res)=>{

    try{
      const {bookid}=req.headers;
      await Book.findByIdAndUpdate(bookid,{
        url:req.body.url,
        title:req.body.title,
        auther:req.body.auther,
        price:req.body.price,
        desc:req.body.desc,
        language:req.body.language

      });
        return res.status(200).json({message:"Book Updated Succesfully"})
    }catch(error){
        return res.status(500).json({message:"server error "})
    }
   
})

router.delete("/delete-book",authenticateToken,async(req,res)=>{

    try{
      const {bookid}=req.headers;
      await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"Book deleted Succesfully"})
    }catch(error){
        return res.status(500).json({message:"server error "})
    }
   
})

router.get("/get-book",async(req,res)=>{

    try{
      const book = await Book.find().sort({createdAt:-1});
        return res.json({
            status:"success",
            data: book
        })
    }catch(error){
        return res.status(500).json({message:"server error "})
    }
   
})

router.get("/get-book-category",async(req,res)=>{

    const {category}=req.query;

    try{
      const book = await Book.find({category});
        return res.json({
            status:"success",
            data: book
        })
    }catch(error){
        return res.status(500).json({message:"server error "})
    }
   
})

router.get("/get-book-id/:id",async(req,res)=>{

    try{
        const {id} = req.params;
      const book = await Book.findById(id);
        return res.json({
            status:"success",
            data: book
        })
    }catch(error){
        return res.status(500).json({message:"server error "})
    }
})


module.exports=router;