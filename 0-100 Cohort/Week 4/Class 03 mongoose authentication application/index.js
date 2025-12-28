const express = require("express")
const mongoose = require("mongoose")
const app = express();
require('dotenv').config(); 

// databases provide us with 4 primitive opperations called CRUD
// Create 
// Read 
// Update 
// Delete  

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI);

const UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})

const CourseSchema = new mongoose.Schema({
    title:String,
    price:5999
})

const User = mongoose.model("User",UserSchema);
const Course = mongoose.model("User",CourseSchema);


// Read 
// finds through id 
// User.findById("1");
// // find on element
// User.findOne({
//     email:"kinshukdewari@gmail.com"
// });
// // finds all email with this
// User.find({
//     email:"kinshukdewari@gmail.com"
// })


// Update
// updates only one, purschsed course to where User.id is "1"
//  User.updateOne(
//     {"id":"1"},
//     { $push:{ purchasedCourses:courseId}}
//  )
//  // updates all 
//  User.update({},{
//     premium:true
//  })

// Delete 
// User.deleteMany({})

// User.deleteOne({
//     email:"kinshuk@gmail.com"
// })



app.get("/user/signup",function(req,res){
    res.status(500).json({
        msg:"working fine"
    })
})
app.listen(PORT);
