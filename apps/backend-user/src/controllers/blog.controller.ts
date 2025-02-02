import { Request, Response } from "express";
import post from "../model/blog.model"

export const createBlog = async (req: Request, res: Response): Promise<any> => {
    const {title, content} = req.body;
    console.log("inside the create blog func backend");
    
    try {
        if(!title || !content) {
            return res.status(400).json({message: "Please fill in all fields."})
        }

        const toSavePost = await post.create({
            title: title,
            content: content,
            date: Date.now(),
        })

        return res.status(201).json({
            ok: "blog post saved success",
            post: toSavePost
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Error creating blog",
            error: error.message
        })
    }
}