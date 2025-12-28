class Animal{
    constructor(name,legCount,speaks){
        this.name=name;
        this.legCount=legCount;
        this.speaks=speaks;
    }
    // static method can be called without intanciating the object
    static myType(){
        console.log("Animal")
    }
    speak(){
        console.log(this.name,"has",this.legCount,"legs and speaks",this.speaks)
    }
}

let dog = new Animal("dog",4,"barks"); // create  object
dog.speak();   // call function on object
let cat = new Animal("cat",4,"mewos");
cat.speak();

console.log(Animal.myType());