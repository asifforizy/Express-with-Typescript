import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
    try {
        console.log("REQ BODY 👉", req.body);
        const result = await profileService.createProfile(req.body)
        res.status(201).json({
            success: true,
            message: "profile created successfully!",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}


export const profileController = {
    createProfile,
}