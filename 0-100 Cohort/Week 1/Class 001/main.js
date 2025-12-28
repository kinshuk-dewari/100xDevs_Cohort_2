// variables :
// var , let , const  
// these are used define variables  var is the og way to define a variable , 
// let is used to define variables , 
// const is used to define variable whose values are used which are constant and its vales can't be changed
// and when const values are changed it will give a TypeError: Assignment to constant variable
function sum0(num1,num2){
    return num1+num2;
}
function printTable(number){
    for(let i=1;i<10;i++) console.log(number*i," ");
}
printTable(10);
let firstName = "Kinshuk"
let isBoy = true
console.log(firstName);

if(isBoy){
    console.log(firstName," is a boy")
}

// Callback Functions
function sum1(num1,num2,func){
    let result = num1+num2;
    func(result);
}


function displayOutput(result){
    console.log("the result of sum using callbacks : ",result);
}
let a = sum0(2,8);
console.log("The result of sum is :",a);
// call back funstion
let s = sum1(2,4,displayOutput);
// displayOutput(s);


// Arrays 
const array = ["kinshuk","anna","saurav"]
const gender = ["male","female","male"]

for(let i = 0;i<array.length;i++){
    console.log(array[i]);
}

// objects 

const obj = [{
    firstname:"kinshuk",
    gender:"male"
},{
    firstname:"anna",
    gender:"female"
},{
    firstname:"saurav",
    gender:"male"
}]

for(let i=0;i<obj.length;i++){
    if(obj[i].gender=="male"){
        console.log(obj[i].firstname,"is male")
    }
}