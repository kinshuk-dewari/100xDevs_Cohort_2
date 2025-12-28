// function to return the first element of the array
// type Input = number | string;
// function firstElement(arr:Input[]){
//     return arr[0];
// }
// const value = firstElement(['apple','banana'])
// console.log(value.toUpperCase())


// problems: 
// 1. User can send different types of values in inputs, without any type errors
// 2. Typescript isn’t able to infer the right type of the return type


// GENERICSL: 
// Generics enable you to create components that work with any data type 
// while still providing compile-time type safety.

function identity<T>(arg:T):T{
    return arg;
}

let op1 = identity("string");
let op2 = identity(1);
let op3 = identity({'hello':1});

console.log(op1.toUpperCase())

// problem statement 1: solution

function firstElement<T>(arg:T[]):T{
    return arg[0];
}

interface USers{
 name:string
}

let output1 = firstElement([1,2,3,4])
let output2 = firstElement(['a','b','c'])
let output3 = firstElement<USers>([{name:'a'}])
console.log(output1)
console.log(output2)
console.log(output3.name)

// problem statement 1: solution