import { PrismaClient } from "@prisma/client";

const  prisma =  new PrismaClient();

async function insertUser(username:string,password:string,firstname:string,lastname:string){
    try{
        // the prisma auto calls the prisma.$connect() so we don't need to connect it manunally, but for the 
        const res = await prisma.user.create({
            data:{
                email:username,
                password,
                firstname,
                lastname
            }
        });
        console.log("DATA INSERTION SUCCESS: ",res)
    }
    catch(e){
         console.error("Failed to insert user:", e);
        throw e;
    }
    finally{
        await prisma.$disconnect()
        console.log("DATABASES SUCCESSFULLY DISCONNECTED");
    }
}
// insertUser("kk1@gmail.com","12345","kinshuk1","dewari1")


// SELECT: display all the data that is present in the table
async function displayUsers(){
    try{
        const users = await prisma.user.findMany();
        console.log("All Users: ",users);
    }
    catch(e){
        console.error("ERROR: ",e);
    }
    finally{
        console.log("DATABASE SUCCESSFULLY DISCONNECTED")
    }
}
displayUsers();

// UPDATE : update firstname and lastname in the user table using email
interface UpdatedParams{
    firstname:string;
    lastname:string;
}

async function updateUser(username:string,{
    firstname,
    lastname
}:UpdatedParams){
    try{
        const res = await prisma.user.update({
            where:{email:username},
            data:{
                firstname,
                lastname
            }
        })
        console.log("UPDATED DATA: ",res)
    }catch(e){
        console.error("ERROR: ",e);
    }finally{
        await prisma.$disconnect();
        console.log("DATABASES SUCCESSFULLY DISCONNECTED");
    }
}
// updateUser("kk@gmail.com",{
//     firstname:"KINSHUK_007",
//     lastname:"DEWARI_007"
// })