
// What are Enums ?
// Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.
// The concept behind an enumeration is to create a human-readable way to represent a set of constant values, which might otherwise be represented as numbers or strings.

enum Direction{
    Up, // 0
    Down, // 1
    Left, // 2
    Right // 3
}
// we can provide emuns custom value too, 
// if not provided then its defaults to 0,1,2,..., 
// when giving them value we have to give all of them a value
enum Direction1{
    Up = 'up', 
    Down = 'down', 
    Left = 'left', 
    Right = 'right' 
}

function doSomething(keyPressed:Direction){
    if(keyPressed==Direction.Down){
        console.log("Down Directoin")
        console.log(Direction.Down) // prints 1
        
    }
    else if(keyPressed==Direction.Up){
        console.log("Up Directoin")
        console.log(Direction.Up) // prints 0
    }
    else if(keyPressed==Direction.Left){
        console.log("Left Directoin")
    }
    else if(keyPressed==Direction.Right){
        console.log("Right Directoin")
    }
    else {
        console.log("wrong input")
    }
}
doSomething(Direction.Down)
doSomething(Direction.Right)


// common usecase in Express 
// const app = express(); 
// enum ResponseStatus {
//     Success = 200,
//     NotFound = 404,
//     Error = 500
// }

// app.get("/', (req, res) => {
//     if (!req.query.userId) {
// 			res.status(ResponseStatus.Error).json({}) // easier readability of the code and easier reusability of code reduces redudancy
//     }
//     // and so on...
// 		res.status(ResponseStatus.Success).json({});
// })