import express from 'express'

import { getPosts,createPost, updatePost,deletePost,likePost,getPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'
import { getPostsBySearch } from '../controllers/posts.js';

const router = express.Router();

router.get('/search',getPostsBySearch)
router.get('/',getPosts)
router.get('/:id',getPost)

router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)


export default router