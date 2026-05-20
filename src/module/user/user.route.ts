import { Router, type NextFunction, type Request, type Response } from "express";
import app from "../../app";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router =Router()




// post user
router.post('/', userController.createUser)

// get user
router.get('/',auth() , userController.getAllUsers)

// get single user
router.get('/:id', userController.getSingleUser)

// update
router.put('/:id', userController.updateUser) 

// delete
router.delete('/:id', userController.deleteUser)




export const userRoute = router ;