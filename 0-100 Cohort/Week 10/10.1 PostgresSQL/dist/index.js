"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable"
});
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect()
            .then(() => {
            console.log("Connected to PostgreSQL");
        })
            .catch((err) => {
            console.error("Connection error", err);
        });
        try {
            const result = yield client.query(`    
          CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(225) UNIQUE NOT NULL,
            password VARCHAR(225) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
        `);
            console.log(result);
            const result1 = yield client.query(`    
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
        `);
            console.log(result1);
        }
        catch (e) {
            console.error("Error: ", e);
        }
        finally {
            yield client.end();
        }
    });
}
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.query(`
      INSERT INTO addresses (user_id, city, country, street, pincode)
      VALUES (1, 'New York', 'USA', '123 Broadway St', '10001');
      `);
            console.log("DATA INSERTION SUCCESS : ", result);
        }
        catch (error) {
            console.error("ERROR during the DATA INSERTION : ", error);
        }
        finally {
            yield client.end();
        }
    });
}
function secureInsertion(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
            const values = [username, email, password];
            const res = yield client.query(insertQuery, values);
            console.log('Insertion success:', res);
        }
        catch (error) {
            console.error("Insertion Error: ", error);
        }
        finally {
            yield client.end();
        }
    });
}
function getUSer(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const selectQuery = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const res = yield client.query(selectQuery, values);
            console.log(`Selected Value according to email -> ${email}\n`, res.rows[0]);
        }
        catch (e) {
            console.error("Error :", e);
        }
        finally {
            yield client.end();
        }
    });
}
function join(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = `SELECT u.id,u.username,u.email,a.city,a.country,a.pincode
      FROM users u
      JOIN addresses a ON u.id = a.user_id
      WHERE u.id = $1 
    `;
            const result = yield client.query(query, [userId]);
            if (result.rows.length > 0) {
                console.log('User and address found:', result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user or address found with the given ID.');
                return null;
            }
        }
        catch (e) {
            console.error("ERROR: ", e);
            throw e;
        }
        finally {
            yield client.end();
        }
    });
}
join('1');
