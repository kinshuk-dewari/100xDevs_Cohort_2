// What are types?
// Very similar to interfaces , 
// types let you aggregate data together.

type Users = {
    name:string;
    age:number;
}

//  Unions 
// if you want a variabke to have more either of mentioned datatypes examples:

type stringOrNumber = string | number; // either string or a number

function prinId(id:stringOrNumber){
    console.log(`ID:${id}`);
}

prinId(69);
prinId("hello_bond_007");

// Intersection
// What if you want to create a type that has every property of multiple types/ interfaces

// you cant do this using interface

type Employees = {
    name:string;
    startDate:Date;
}

type Manager = {
    name:string;
    department:string;
}

type TeamLead = Employees & Manager;

const teamLead:TeamLead={
    name:"Kinshuk",
    startDate:new Date(),
    department:"Software Developer"
}
console.log(`Team Lead Details:
Name: ${teamLead.name}
Start Date: ${teamLead.startDate.toDateString()}
Department: ${teamLead.department}`)