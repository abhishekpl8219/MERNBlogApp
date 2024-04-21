import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async(req,res,next)=>{


    if (!req.user.isAdmin){
        next(errorHandler(403,'you are not allowed to creat a post'));
    }
    if(!req.body.title || !req.body.content){
        next(errorHandler(403,'please provide all contents'));
    }
    const slug = req.body.title .replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    const newPost= new Post({
        ...req.body,
        slug,
        userId:req.user.id,
    });
    try {
        const savedPost = await newPost.save() 
        res.status(201).json(savedPost);
        
    } catch (error) {
        next(error);
        
    }
}