// What is typescript?
// TypeScript is a programming language developed and maintained by Microsoft. 
// It is a strict syntactical superset of JavaScript and adds optional static typing to the language.

// let x: number = 1;
// x = 'kinshuk';
// console.log(x);


// Write a function that greets a user given their first name. 
// Argument - firstName
function greet(name:string){
    console.log("Hello World User: "+name);
}
greet('kinshuk');

// Sum function
function sum(a:number,b:number){
    console.log("Numbers:\n a: "+a+",b: "+b+"\nSum = "+(a+b));
}
sum(60,9);


// Return true or false based on if a user is 18+
function isLegal(age:number){
    return age>18;
}
isLegal(15)?console.log("Congrats! You are of legal age"):console.log("Sorry! You aren't of legal age");

// Create a function that takes another function as input, and runs it after 1 second.
function onCommand(fn:()=>void){
    setTimeout(fn,1000);
}
onCommand(function(){
    console.log("Sup Bitch !!!")
})
