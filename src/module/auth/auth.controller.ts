import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req : Request, res : Response) => {

    try {

        const result = await authService.loginUserIntoDB(req.body)

        res.status(200).json({
            message: "User logged in successfully",
            data: result
        })

    } catch (error : any) {
        res.status(500).json({
            message: "internal server error !!!!",
            error: error.message
        })
        
    }
}




export const authController = {
  loginUser,
}