// ARRAYS
// Given an array of positive integers as input, return the maximum value in the array

// function maxValue(arr:number[]){
//     let maxNumber=0;
//     for(let i=0;i<arr.length;i++) {
//         if(arr[i]>maxNumber) maxNumber=arr[i];
//     }
//     return maxNumber;
// }
// console.log(maxValue([1,21,4,6]));

// Given a list of users filter out the users that are of legal age

interface Users1{
    firstName:string;
    lastName:string;
    age:number;
}

function filterAge(user:Users1[]){
    return user.filter(x=>x.age>18)
}

console.log(filterAge([{
    firstName:'kinshuk',
    lastName:'dewari',
    age:19
},{
    firstName:'praful',
    lastName:'loda',
    age:20 
}]))