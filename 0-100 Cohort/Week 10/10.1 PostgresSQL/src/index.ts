import { Client } from "pg";
 
const client = new Client({
  connectionString:"postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable"
})

// CREATE TABLE 
// create a table in postgres
async function createUserTable(){
  await client.connect()
    .then(() => {
      console.log("Connected to PostgreSQL");
      // return client.end();  // closes the connection after testing
    })
    .catch((err) => {
      console.error("Connection error", err);
    });

    try{
        const result = await client.query(`    
          CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(225) UNIQUE NOT NULL,
            password VARCHAR(225) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
        `)
        console.log(result)

        // creating RELATIONSHIPS in sql, creating table addresses with a foreign key relationship to the user table
        const result1 = await client.query(`    
          CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          );  
        `)
        console.log(result1)
    }
    catch(e){
      console.error("Error: ",e)
    }
    finally{
      await client.end();
    }    
}
// createUserTable();



// INSERT DATA 
// Create a function that let’s you insert data into a table. Make it async, make sure client.connect resolves before u do the insert


// this is not wrong to use but its not secure, SQL Injection can be performed.

async function insertData(){
  try{
    await client.connect();
    // const result = await client.query(`
    //   INSERT INTO users(username,email,password) 
    //   VALUES ('kinshuk','kk@example.com','password');
    //   `)

    // inserting values in the adderesses table
    const result = await client.query(`
      INSERT INTO addresses (user_id, city, country, street, pincode)
      VALUES (1, 'New York', 'USA', '123 Broadway St', '10001');
      `)
      console.log("DATA INSERTION SUCCESS : ",result);
  }
  catch(error){
    console.error("ERROR during the DATA INSERTION : ",error);
  }
  finally{
    await client.end();
  }
}
// insertData();


// for creating secure connection make sure that you dont put the user provided fields into your SQL query

async function secureInsertion(username: string, email: string, password: string){
  try{
    await client.connect();
    // Use parameterized query to prevent SQL injection
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log('Insertion success:', res); // Output insertion result
  }
  catch(error){
    console.error("Insertion Error: ",error);
  }
  finally{
    await client.end();
  }
}
// secureInsertion('kinshuk3', 'kk3@example.com', 'kk3_password').catch(console.error);


// Query data
// Write a function getUser that lets you fetch data from the database given a email as input.

async function getUSer(email:string){
  try{
    await client.connect();

    const selectQuery = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const res = await client.query(selectQuery,values);
    console.log(`Selected Value according to email -> ${email}\n`,res.rows[0]);
    // if (res.rows.length > 0) {
    //   console.log('User found:', res.rows[0]); // Output user data
    //   return res.rows[0]; // Return the user data
    // } else {
    //   console.log('No user found with the given email.');
    //   return null; // Return null if no user was found
    // }

  }catch(e){
    console.error("Error :",e);
  }
  finally{
    await client.end();
  }
}
// getUSer("kk3@example.com").catch(console.error);


// JOIN 
// For example, if I ask you to fetch me a users details and  their address
async function join(userId:string){
  try{
    await client.connect();
    const query = `SELECT u.id,u.username,u.email,a.city,a.country,a.pincode
      FROM users u
      JOIN addresses a ON u.id = a.user_id
      WHERE u.id = $1 
    `;

    const result = await client.query(query,[userId]);
    if (result.rows.length > 0) {
      console.log('User and address found:', result.rows[0]);
      return result.rows[0];
    } else {
      console.log('No user or address found with the given ID.');
      return null;
    }   
  }
  catch(e){
    console.error("ERROR: ",e);
    throw e;
  }
  finally{
    await client.end();
  }
}
join('1');

// Benefits of using join 
// 1. Reducced latency
// 2. SImplified Application Logic 
// 3.Transactional Integrity

// Types of JOINS 
// 1. INNER JOIN : Returns rows when there is at least one match in both tables. If there is no match, the rows are not returned. It's the most common type of join.
// 2. LEFT JOIN : Returns all rows from the left table, and the matched rows from the right table.
// 3. RIGHT JOIN : Returns all rows from the right table, and the matched rows from the left table.
// 4. FULL JOIN : Returns rows when there is a match in one of the tables. It effectively combines the results of both LEFT JOIN and RIGHT JOIN.

// USE CASES 
// 1. INNER JOIN : Find All Users With Their Addresses. If a user hasn’t filled their address, that user shouldn’t be returned
// `SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// INNER JOIN addresses ON users.id = addresses.user_id;`

// 2. LEFT JOIN : To list all users from your database along with their address information (if they've provided it), you'd use a LEFT JOIN. Users without an address will still appear in your query result, but the address fields will be NULL for them.
// `SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// LEFT JOIN addresses ON users.id = addresses.user_id;`

// 3. RIGHT JOIN : Given the structure of the database, a RIGHT JOIN would be less common since the addresses table is unlikely to have entries not linked to a user due to the foreign key constraint. However, if you had a situation where you start with the addresses table and optionally include user information, this would be the theoretical use case.
// `SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// RIGHT JOIN addresses ON users.id = addresses.user_id;`

// 4. FULL JOIN : A FULL JOIN would combine all records from both users and addresses, showing the relationship where it exists. Given the constraints, this might not be as relevant because every address should be linked to a user, but if there were somehow orphaned records on either side, this query would reveal them.
// `SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// FULL JOIN addresses ON users.id = addresses.user_id;`