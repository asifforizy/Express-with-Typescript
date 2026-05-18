import { Router, type Request, type Response } from "express";
import app from "../../app";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router =Router()

// post user
router.post('/', userController.createUser)

// get user
router.get('/', userController.getAlluser)

// get single user
router.get('/:id', userController.getSingleUser)

// update
router.put('/:id', userController.updateUserInfo )

// delete
router.delete('/:id', userController.deleteUser)




export const userRoute = router ;