import express, {
  type Application,
  type Request,
  type Response
} from "express"

import config from "./config";

import { userRoute } from "./module/user/user.route";
import { profileRoute } from "./module/profile/profile.route";
import { authRoute } from "./module/auth/auth.route";
import logger from "./middleware/logger";


const app: Application = express()
const port = config.port

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


app.use(logger);





app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    author: "admin"
  })
})


app.use('/api/users', userRoute)
app.use("/api/profile", profileRoute)
app.use("/api/auth", authRoute)












export default app;