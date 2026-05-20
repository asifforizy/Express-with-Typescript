import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { pool } from "../db";

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        // console.log(req.headers.authorization)
        const token = req.headers.authorization



        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }


        const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload;


        const userData = await pool.query("SELECT * FROM users WHERE email = $1", [decoded.email])



        const user = userData.rows[0]

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        if (!user.is_active) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        next()
    }
}



export default auth;