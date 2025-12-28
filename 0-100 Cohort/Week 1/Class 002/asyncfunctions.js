function onDone(){
    console.log("hi there");
}
setTimeout(onDone,1000);
console.log("aftre async");
for(let i=0;i<100000;i++){

}

// firstly it prints 
// aftre async 
// then after sometime  it prints 
// hi there

// some in bulit async functions are: 
// setTimeout and read file 
// the js thread asks for the setTimeout to the os and 
// wait for some time int mean while the thread moves  
// the async task is maintained by another thing i.e., WEBAPIS
// forward and calculates the loop  and when the thread is ideal 
// and the async function if completed will be sent to callback queue till the thread is ideal
// os says i m done with setTimeout then it prints hi there