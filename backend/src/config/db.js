import {neon} from "@neondatabase/serverless";

import "dotenv/config";

//creates a sql connection using our DB sql
export const sql = neon(process.env.DATABASE_URL)

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id  VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category   VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        // DECIMAL (10,2)
        //means :  \a fixed point number with
        //10 digit total
        //2 digits after the decimal point
        // so the max value it can store is 99999999.99 (8 digits before the decimal and after decimal 2 digit)  
    console.log("database initialized successfully");
  } catch (error) {
    console.log("error in initializing the database ", error);
    process.exit(1); //status code 1 means failure , 0 success
  }
}