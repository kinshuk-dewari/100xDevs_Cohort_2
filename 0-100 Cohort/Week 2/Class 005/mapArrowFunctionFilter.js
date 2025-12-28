// map, filter, arrow function


function sum(a,b){
    console.log(a+b);
}

const sum1=(a,b)=>{
    return a+b;
}

let ans = sum1(1,2);
console.log(ans);

let arr = [1,2,3,4,5]
// multiply each values in the arr by 2 [2,4,6,8,10]

function mul(i){
    return i*2;
}
let a = arr.map(mul)
console.log(a)

const b = arr.filter(function(n){
    return (n%2==0)?true:false;
});
console.log(b)
