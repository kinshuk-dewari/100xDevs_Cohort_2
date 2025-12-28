// const fs = require('fs');

// function kkReadFile(cb){
//     fs.readFile("a.txt","utf-8",function(err,data){
//         cb(data);
//     });
// }

// function onDone(data){
//     console.log(data)
// }

// kkReadFile(onDone)

// using promises : these are syntactical sugar used to make the code look prettier
// const fs = require('fs');

// function kkRead(){
//     return new Promise(function(resolve){
//         fs.readFile("a.txt","utf-8",function(err,data){
//             resolve(data);
//         });
//     })
// }

// function onDone(data){
//     console.log(data);
// }
// kkRead().then(onDone);


// promise is a class 
// is used to make callbacks and async functions slightly more readable
// it has three states that it could be in  pending , resolved and rejected


// syntax 
let p = new Promise(function(resolve){
    // this is place where you will write your async code eg getting data from the backend etc 
    // and when async magic is done here is where you call the resolve function
    resolve("safs");  
});
 // .then gets called whenever the async function resolves
p.then(function(){
    console.log(p);
})


// example a function that greets you after 1 seconds

function greet(){
    let f = new Promise(function(resolve){
        setTimeout(resolve,1000)
    })
    return f;
}


const k = greet();
k.then(function(){
    console.log("greeted user after 1 sec")
})


// Async Await

function asyncfunction(){
    let p = new Promise(function(resolve){
        setTimeout(function(){
            resolve("hi there")
        },1000);
    });
    return p;
}
async function main(){ // a function that call await need to be a async function
    // no callbacks no .then syntax
    let value = await asyncfunction()
    console.log(value);

    // rather than calling the .then syntax , we add the await before and get the final value rathen than Promise<pending>
}
main();