//Main route
const express =require("express");
const mongoose=require("mongoose");
const blogsRouter=require("./routes/blogs");
//creating the model blog
const Blog=require("./models/blog");
//override the form  method
const ChangeMethod=require('method-override');
const app=express();

const Months=["January","February","March","April","May","June","July","August","September","October","November",
"December"];


//Data Base connection
mongoose.connect("mongodb://localhost/blogs",{
    useNewUrlParser:true,useUnifiedTopology:true})
    .then((result) =>console.log("connected to db"))
    .catch((err) =>console.log(err));


//setting the view engine   
app.set("view engine","ejs");
//this middleware is used to get the body parser from the request so we can acces req.body. it contains all the informations that we submitted through the form
app.use(express.urlencoded({ extended:false}));
//override the form  method
app.use(ChangeMethod("_method"));

//Running server and setting port
app.listen(8000,function(){
    console.log("server is running on "+8000);
})



//Get all the blogs documents  from collection and load them on the Main Page 
app.get("/",(req,res)=>{
    //This method is used to select all documents from collection and sort them in descinding order
    Blog.find().sort({ creationDate : -1 })
        .then((result)=>{
            res.render("HomePage",{obj:result,month:Months,titre:"My Blogs"})
        })
        .catch((err) => {
            console.log(err);
        })
    
    
    
});

//Create separated route called "/blogs" 
app.use("/blogs",blogsRouter);

//404 page
app.use((req,res)=>{
    res.status(404).render("404",{titre:"Opss "});
})

