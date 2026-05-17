import express, { type Application, type Request, type Response } from "express"

import { Pool } from "pg"

const app: Application = express()
const port = 3000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_c4Dm9ECArNoO@ep-rapid-sound-aqwv4sj5.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require"
})

const initDB = async () => {
  try {
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
      `)
console.log("database connected successfully!!!")

  } catch (error) {
    console.log(error)
  }
}


initDB();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    author: "admin"
  })
})

app.post('/', async (req: Request, res: Response) => {
  const { name, email, password ,age } = req.body;
const result = await pool.query(`
  INSERT INTO users(name,email,password,age) VALUES ($1,$2,$3,$4) 
  RETURNING *
  `,[name,email,password,age])

  console.log(result)

  res.status(201).json({
    message: "created",
    data: result.rows[0]
    
  })

})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})