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
        const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
        await newPost.save()
        return res.status(201).json(newPost)

    }catch(error){
        return res.status(409).json({message:error.message})
    }
}

export const updatePost = async(req,res) =>{
   const { id:_id } = req.params;
   const post = req.body;
   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

   const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ ...post,_id},{new:true});
   res.json(updatedPost)
}

export const deletePost = async (req,res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

    await PostMessage.findByIdAndRemove(id)
    return res.json({message:'Post deleted successfully'})
}

export const likePost = async (req,res) => {
    const { id } = req.params

    if(!req.userId) return res.json({message:'Uauthenticated'})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

    const post = await PostMessage.findById(id)
    const index = post.likeCount.findIndex((id)=>id == String(req.userId))

    if(index == -1){
        post.likeCount.push(req.userId)
    }else{
        post.likeCount = post.likeCount.filter((id)=> id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
    console.log(updatedPost)

    res.json(updatedPost)
}