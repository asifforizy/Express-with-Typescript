import express, {
  type Application,
  type Request,
  type Response
} from "express"

import config from "./config";

import { userRoute } from "./module/user/user.route";
import { profileRoute } from "./module/profile/profile.route";

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

app.use("/api/profile",profileRoute)












export default app;