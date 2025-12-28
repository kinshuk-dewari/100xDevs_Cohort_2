const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://kinshukdewariwastaken:SrK5WygiwXD0XTKZ@cluster0.voe1m.mongodb.net/userappnew?retryWrites=true&w=majority&appName=Cluster0",
);
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
const User = mongoose.model("User", UserSchema);
// const user = new User({ 
//     name:"kinshuk",
//     email:"kinshuk@example.com",
//     password:"1234"
// });
// user.save().then(()=>{
//     console.log("user saved successfully");
// }).catch(err=>{
//     console.log("error saving user:",err);
// });

const app = express();
app.use(express.json());


// mongodb functions are async function so you have to warp it in a async await
async function userExists(email, password) {
    try {
      const existingUser = await User.findOne({ email: email, password: password });
  
      if (existingUser) {
        console.log("User exists");
        return true;
      }
       else  return false;
    
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  }

app.post("/signup", async function(req,res){
    const name = req.body.name;    
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({email:email});

    if(existingUser){
        return res.status(400).send("username already exists");
    }

    const user = new User({
        name:name,
        email:email,
        password:password
    });
    user.save();
    res.json({
        "msg":"user created successfully"
    })
})


app.post("/signin",async function(req,res){
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try{
    const exists = await userExists(email,password);
  
    if(!exists){
      return res.status(403).json({
        msg:"User does not exists in our database"
      })
    }

    // this sign 
    var token = jwt.sign({name:name},jwtPassword);
    return res.json({token});
  }
  catch(err){
    console.log("the error is :",err)
    return res.status(500).json({
      msd:"user does not exists"
    });
  }

});

// app.post("/signin", async function (req, res) {
//     const { name, email, password } = req.body;

//     try {
//         const userExistsInDB = await userExists(email, password);

//         if (!userExistsInDB) {
//             return res.status(403).json({
//                 msg: "User doesn't exist in our database",
//             });
//         }

//         var token = jwt.sign({ name: name }, jwtPassword);
//         return res.json({ token });

//     } catch (error) {
//         console.error("Error during sign-in:", error);
//         return res.status(500).json({ 
//             msg: "Internal server error" 
//         });
//     }
// });


app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username from the database
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});


app.listen(3000);