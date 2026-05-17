import { Router, type Request, type Response } from "express";
import app from "../../app";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router =Router()



// post user

router.post('/', userController.createUser)


export const userRoute = router ;