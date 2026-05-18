import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDb(req.body)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAlluser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB()

        res.status(200).json({
            success: true,
            message: "users retrieved successfully!",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const result = await userService.getSingleUserinfo(id as string)

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            })
        }



        res.status(200).json({
            success: true,
            message: "user retrieved successfully!",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateUserInfo = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email, password, age } = req.body

    try {
        const result = await userService.updateInfoFromDB(
            name,
            email,
            password,
            Number(age),
            id as string
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
            message: error.message
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const result = await userService.deleteUserFromDB(id as string)

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
            message: error.message
        })
    }
}

export const userController = {
    createUser,
    getAlluser,
    getSingleUser,
    updateUserInfo,
    deleteUser
}