function square(n){
    return n*n;
}
function cube(n){
    return n*n*n;
}
function sumofSquare(a,b){
    let sq1=square(a);
    let sq2=square(b);
    return sq1+sq2;
}
function sumofCube(a,b){
    let sq1=cube(a);
    let sq2=cube(b);
    return sq1+sq2;
}
// CallBacks
function sumofAll(a,b,fn){
    let sq1 = fn(a);
    let sq2 = fn(b);
    return sq1+sq2;
}


let ans=sumofAll(1,2,cube);
console.log(ans);