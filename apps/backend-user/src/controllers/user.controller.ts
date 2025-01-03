import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import userModel from "../model/user.model";
import bcrypt from "bcryptjs"


export const signup = async(req: Request, res: Response): Promise<any> => {
    const {name,email,username,password,bio,skills,profilepic} = req.body;
    console.log(req.body);

    try {
        if(!name || !email || !username || !password || !skills || !bio) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        const isexists = await userModel.findOne({username});
        if(isexists) {
            return res.status(301).json({
                message: "user already exists"
            })
        }

        const hashedpass = await bcrypt.hash(password,10);
        if(!hashedpass) {
            return res.status(400).json({
                message: "password hashing failed"
            })
        }

        const newuser = await userModel.create({
            name,
            username,
            email,
            password: hashedpass,
            bio,
            skills,
            profilepic
        });

        console.log("user created: ", newuser);       

        const token = jwt.sign({id: newuser._id},process.env.JWT_SECRET!, {expiresIn: "2d"})
        return res.status(201).json({
            message: "user created successfully",
            token: token,
            user: newuser
        })

    } catch (error: any) {
        return res.status(500).json({
            message: "error signup",
            result: error.message
        })
    }
}

export const login = async(req: Request, res: Response): Promise<any> => {
    const {username,password} = req.body;

    try {
        if(!username || !password) {
            return res.status(400).json({
                message: "username and password are required"
            })
        }

        const isthere = await userModel.findOne({username})
        if(!isthere) {
            return res.status(400).json({
                message: "username not found"
            })
        }

        const isPassCorrect = await bcrypt.compare(password, isthere.password!)
        if(!isPassCorrect) {
            return res.status(400).json({
                message: "password is incorrect"
            })
        }

        const token = jwt.sign({id: isthere.username}, process.env.JWT_SECRET!, {expiresIn: "2d"});
        return res.status(200).json({
            message: "login successful",
            token: token,
            user: isthere
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "error while login",
            result: error.message
        })
    }
}