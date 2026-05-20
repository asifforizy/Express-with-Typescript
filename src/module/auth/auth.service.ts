import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../db";
import type { IAuth } from "./auth.interface";
import config from "../../config";

const loginUserIntoDB = async (payload: IAuth) => {
    const { email, password } = payload;

    // 1. Check user exists
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) {
        throw new Error("Invalid credentials");
    }

    const user = result.rows[0];

    // 2. Compare password
    const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }

    // 3. Check JWT secret
    if (!config.secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    // 4. JWT payload
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active
    };

    // 5. Generate token
    const accessToken = jwt.sign(
        jwtPayload,
        config.secret as string,
        { expiresIn: "1d" }
    );

    // remove password before returning user
    delete user.password;

    // 6. RETURN DATA
    return {
        accessToken,
        user
    };
};

export const authService = {
    loginUserIntoDB,
};