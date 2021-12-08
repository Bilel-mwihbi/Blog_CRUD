const { render } = require("ejs");
const express =require("express");
const router=express.Router();
const Blog=require("../models/blog");

const Months=["January","February","March","April","May","June","July","August","September","October","November",
"December"];



router.get("/new",(req,res)=>{
    res.render("newBlog",{obj:new Blog(),titre:"Add new Blog"});
})

router.get("/:id",(req,res) => {
    const id=req.params.id;
   
    Blog.findById(id)
        .then((result)=>{
            res.render("Details",{obj:result,month:Months,titre:"Details"})
        })
        .catch((err)=>{
            console.log(err)
        })
})
//Post Request 
//Creating new instance of blog document and then save it to blogs collection 
router.post("/", (req,res) => {
    let blog=new Blog({
        title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        author:req.body.author
    });
    blog.save()
        .then((result) =>{
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        })
        
   
});

//Delete Request
router.delete("/:id",async (req,res) =>{
   await Blog.findByIdAndDelete(req.params.id);
   
    res.redirect("/");
});

router.get("/edit/:id",(req,res)=>{
    Blog.findById(req.params.id)
        .then((result)=>{
            res.render("Edit",{obj:result,titre:"Edit blogs"})
        })
        .catch((err)=>{
            console.log(err)
        })
   
})

//Put Request
router.put("/:id",(req,res) => {
        Blog.findByIdAndUpdate({_id: req.params.id},
        {
        title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        author:req.body.author,
            })
         .then((result) =>{
            res.redirect("/");
        })    
       
})
module.exports =router;