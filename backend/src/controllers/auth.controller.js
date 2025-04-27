import bcrypt from "bcryptjs"
import { db } from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js";

import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { email, password, name } = req.body;    
    try {
        const existingUser = await db.user.findUnique({
            where: { email }
        })
        if (existingUser) {
            return res.status(400), json({
                err: "User already registered."
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await db.user.create({
            data:{
                email,
                password:hashPassword,
                name,
                role:UserRole.USER
            }
        })
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 //7days
        })

        res.status(201).json({
            mes: "user created",
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                images: newUser.image
            }
        })


    } catch (error) {
        console.log("err", error);
        
        // return res.status(400), json({
        //     msg: "Error in Authentication"
        // })
    }
}
export const login = async (req, res) => { 
    const {email, password}= req.body;
    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return res.status(401).json({
                error:"User not found"
            })
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            res.status(401).json({
                msg:"Invalid Credentials"
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 //7days
        })
        res.status(200).json({
            mes: "user loggedin",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image
            }
        })

    } catch (error) {
        console.log("Error in login", error);
        res.status(500).json({
            msg:"Error in login"
        })
    }
    
}
export const logout = async (req, res) => { 
    try {
        res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "production",
           
        })
        res.status(200).json({
            success:true,
            msg: "Logout successfully"
        })
    } catch (error) {
        console.error("Error in logout", error);
        
        res.status(500).json({
            msg:"Error in Logout"
        })
    }
}
export const check = async (req, res) => { 
    try {
        res.status(200).json({
            success:true,
            msg:"user Authencticate successfully",
            user:req.user
        })
    } catch (error) {
        console.log("Error in check", error);
        
        res.status(500).json({
            msg:"Error in Logout"
        })
    }
}


