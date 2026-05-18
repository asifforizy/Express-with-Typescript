import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string
})

export const initDB = async () => {
  try {

    // USERS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // PROFILE TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles(
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        phone VARCHAR(15),
        gender VARCHAR(30),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // DEMO USER INSERT
    await pool.query(`
      INSERT INTO users(name, email, password, age)
      VALUES
      ('Asif', 'asif@gmail.com', '123456', 22),
      ('Rahim', 'rahim@gmail.com', '123456', 25)
      ON CONFLICT (email) DO NOTHING
    `);

    // DEMO PROFILE INSERT
    await pool.query(`
      INSERT INTO profiles(user_id, bio, address, phone, gender)
      VALUES
      (1, 'I am a software engineer', 'Dhaka', '01700000000', 'Male'),
      (2, 'Backend developer', 'Chittagong', '01800000000', 'Male')
      ON CONFLICT (user_id) DO NOTHING
    `);

    console.log("database connected successfully!!!")

  } catch (error) {
    console.log(error)
  }
}