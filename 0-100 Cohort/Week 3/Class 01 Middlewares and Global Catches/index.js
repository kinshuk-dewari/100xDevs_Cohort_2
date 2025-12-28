// dumb way of doing input validation 
// const express = require("express");

// const app = express();

// const port = 3000

// app.get("/",function(req,res){
//     res.send("hello world")
// })
// app.get("/health-checkup",function(req,res){
//     const kid = req.query.kid; 
//     const uname = req.headers.uname; 
//     const pass = req.headers.pass; 

//     if(uname!="kinshuk" && pass!="pass"){  // user validation 
//         if(kid==1||kid==2){               // kidney validation
//             res.status(403).json({
//                 mgs:"kidney fine"
//             })
//         }else{
//             res.status(403).json({
//                 mgs:"kidney not fine"
//             })
//         }
//     }
//     // res.send("hello world")
// })
// console.log("listining on port",port)
// app.listen(port)


// correct way of doing input validation

const express = require("express")

const app = express()

const port = 3000
// zod 
import {z} from 'zod';
const mySchema = z.string();

// this app.use(function()) this takes a function as an 
// argument ,that function can be thing that you 
// want to be called in every end point of your application 
// for example userCredentails
// app.use(express.json())

// writing middleware is just writing functions 
// that can be used again and again 
// without rewriting the code in all the endpoints 
// of your applications

// syntax  function middleware(request,response,next)  { }
// this next is a function from express that tells  
//   to move to thread to the next function in the route
//  a route through express can handel multiple functions as callbacks
function userMiddleware(req,res,next){
    const username = req.headers.username; 
    const password = req.headers.password; 
    if(username!="kinshuk" && password != "pass"){
        res.status(403).json({
            msg:"Incorrect user credentials",
        });
        res.send({
            re
        })
    } else {
        res.status(403).json({
            msg:"correct user credentials",
        });
        next();
    }
};
function kidneyMiddleware(req,res,next){
    const kid = req.query.kid; 
    if(kid!=1 || kid!=2){
        res.status(403).json({
            msg:"Incorrect kidneys",
        });
    } 
    else if(kid==1){
        res.status(403).json({
            msg:"you have 1 kidney",
        });
    }else if(kid==2){
        res.status(403).json({
            msg:"you have 2 kidney",
        });
    }else {
        next();
    }
};


app.post("/health-checkup",userMiddleware,kidneyMiddleware,function(req,res){
    
    res.send("you are healthy")
})

// global catches the anywhere in the routes there is an exception 
// this global catche will take the exception and display 
// the msg you want to display without displaying your functionalityes or the erros to the users 
app.use(function(err,req,res,next){
    res.json({
        msg:"sorry something is up with our servers"
    })
})

// zod  is user for input validation is used to verify your inputs throught their node packages 
// simply its used for schemas validation 

app.listen(port)