import express, {
  type Application,
  type Request,
  type Response
} from "express"

import { Pool } from "pg"
import config from "./config";
import { initDB, pool } from "./db";
import { userRoute } from "./module/user/user.route";

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


app.use('/api/users',userRoute)












export default app;