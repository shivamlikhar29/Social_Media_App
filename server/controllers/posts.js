import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"


export const getPosts = async (req,res)=>{
    const { page } = req.query;
    
    try {
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
    
}

export const createPost = async (req,res) => {
    const post = req.body
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

    res.json(updatedPost)
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
        // const arrayTags = tags.split(',')
        // console.log(arrayTags)

        try {
            const title = new RegExp(searchQuery, "i");
            
    
            // const posts = await PostMessage.find({tags:{$all: tags}});  
            const posts = await PostMessage.find({ $or: [ { title }, { tags: { $all: tags } } ]});
            console.log(posts)

            res.json({ data: posts });
        } catch (error) {    
            res.status(404).json({ message: error.message });
        }
} 

export const getPost = async (req,res)=>{
    const {id} = req.params
    try{
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    }catch(error){
        return res.status(404).json({message:error.message})
    }
}

export const commentPost = async (req,res) => {
    const { id } = req.params
    const {value} = req.body
    console.log('dddddd')
    const post = await PostMessage.findById(id)

    post.comments.push(value)

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
    

    res.json(updatedPost)
}

