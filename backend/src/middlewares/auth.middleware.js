import jwt from "jsonwebtoken";
import { db } from "../libs/db.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized - No token provided"
            })
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            req.status(401).json({
                msg: "unauthorized - Invalid token"
            })
        }
        const user = await db.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                image: true,
                name: true,
                email: true,
                role: true
            }
        });
        if (!user) {
            return res.status(404).json({ msg: "user not found" })
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in Middleware", error);

    }
}