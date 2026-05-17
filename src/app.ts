import express, {
  type Application,
  type Request,
  type Response
} from "express"

import { Pool } from "pg"
import config from "./config";
import { initDB, pool } from "./db";

const app: Application = express()
const port = config.port

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))





app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    author: "admin"
  })
})


// post user

app.post('/api/users', async (req: Request, res: Response) => {

  try {

    const { name, email, password, age } = req.body

    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, age)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, password, age]
    )

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0]
    })

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
})


// get user




app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
    
      SELECT * FROM users
    `)
    res.status(200).json({
      success: true,
      message: "users retrive successfully!",
      data: result.rows
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })

  }
})

// get single user

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT * FROM users
WHERE id = $1;
      `, [id])


    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
        data: {}

      })
    }

    res.status(200).json({
      success: true,
      message: "users retrive successfully!",
      data: result.rows[0]
    })
  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })

  }
})


// update

app.put('/api/users/:id', async (req: Request, res: Response) => {

  const { id } = req.params
  const { name, email, password, age } = req.body

  try {

    const result = await pool.query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        age = COALESCE($4, age),
        updated_at = NOW()
      WHERE id = $5
      RETURNING *
      `,
      [name, email, password, age, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    })

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
      error
    })
  }
})


// delete

app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
      `,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0]
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    })
  }
})



export default app;