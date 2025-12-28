// method 1 : Without middel wares 
// const express = require("express")
// const app = express();

// function isOld(n){
//     if(n>=18) return true;
//     else return false;
// }
// app.get("/ride1",function(req,res){
//     if(isOld(req.query.age)){
//         res.send({
//             msg:"your ride is ready"
//         })
//     }
//     else{
//         res.status(411).send({
//             msd:"you are under age"
//         })
//     }
// })
// app.listen(3000);

// method 2 : more efficient way using middleware

const express = require("express")
const app = express();


// creating a middleware to check the age of the user
function ageCheck(req,res,next){
    if(req.query.age>=18) next();
    else {
        res.json({
            msg:"sorry you are an underage"
        })
    }
}
// now we are using a middleware so we dont need ot make 
// the /ride1 path to tell what happens when 
// the user is of under age the middleware 
// that we created isOld take care of 
// the underage condition
app.get("/ride1",ageCheck,function(req,res){    
    res.status(500).send({
        msg:"your ride is ready"
    })    
})


// now if i am creating multiple routes and 
// the middleware is beign used in all the routes 
// then we use the app.use(middleware) this tells 
// the routes that are written below it that this middleware 
// is compulsory and is will be used in all the routes 
// that are defined below this app.use() function

app.use(ageCheck);
// now there is no need to include ageCheck in the routes
app.get("/ride2",function(req,res){
    res.status(500).json({
        msg:"you are aligble for the ride"
    })
})

app.listen(3000);
