
// What are Interfaces in TypeScript ?
// TypeScript interfaces are a fundamental feature that allows 
// developers to define the structure of objects 
// by specifying the names and types of their properties and methods.

// for assigining types to the objects we use Interface
// interface objectName{ 
//  variables : dataTypes
// }


// Create a function isLegal that returns true or false if a user is above 18. It takes a user as an input.

interface User{
    firstName:string;
    lastName:string;
    age:number;
    email?:string; // this ? is used to tell typescript that this variable is optional, the user can provide the input or not provide the input.
}
const user={
    firstName:'Kinshuk',
    lastName:'Dewari',
    age:18
}
function greetObject(user:User){
    console.log("Hello there !! "+user.firstName);
}
function isLegalAge(user:User){
    return user.age > 22;
}
greetObject(user);
isLegalAge(user) ? console.log("Valid age"):console.log("Invalid age");