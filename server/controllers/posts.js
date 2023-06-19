import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req,res)=>{
    try{
        const postMessage = await PostMessage.find()
        
        console.log(postMessage)

        return res.status(200).json(postMessage)

    }catch(error){
        return res.status(404).json({message:error.message})
    }
}

export const createPost = async (req,res) => {
    const post = req.body
    console.log(post)
    try{
        const newPost = new PostMessage(post)
        await newPost.save()
        return res.status(201).json(newPost)

    }catch(error){
        return res.status(409).json({message:error.message})
    }
}

export const updatePost = async(req,res) =>{
   const { id:_id } = req.params;
   const post = req.body;
   console.log(_id)
   console.log(post)
   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

   const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ ...post,_id},{new:true});
   res.json(updatedPost)
}

export const deletePost = async (req,res)=>{
    const id = req.params
    const g = req.body
    console.log(id.id)
    return res.json({1:"error.dasdasdmessage"})
}