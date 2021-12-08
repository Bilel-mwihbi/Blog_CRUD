const mongoose = require("mongoose");

//blogsShema desctribe the structure of the document
const blogSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    content:{
        type:String
    },
    creationDate:{
        type:Date,
        default:Date.now
    },
    author:{
        type:String
    }
})

module.exports=mongoose.model("Blog",blogSchema);