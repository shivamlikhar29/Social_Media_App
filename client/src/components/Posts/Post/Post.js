import React from "react";

import useStyles from './styles'
import { Card,CardActions,CardMedia,CardContent,Button,Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'

import { useDispatch } from "react-redux";
import { deletePost,likePost } from "../../../actions/posts";

const Post = ({post,setCurrentId}) =>{
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likeCount.length >= 0) {
          return post.likeCount.find((like) => like === user?.result?.googleId || user?.result?._id)
            ? (
              <><ThumbUpIcon fontSize="small" />&nbsp;{post.likeCount.length > 2 ? `You and ${post.likeCount.length - 1} others` : `${post.likeCount.length} like${post.likeCount.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{post.likeCount.length} {post.likeCount.length === 1 ? 'Like' : 'Likes'}</>
            );
        }}

        console.log(post.creator)
    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography> 
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
            {(user?.result?.sub == post?.creator|| user?.result?._id == post?.creator)&& (

                <Button style={{color:'white'}} size="small" onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            ) }
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography className={classes.title} variant="h5" color={"GrayText"} gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size={"small"} color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
                   <Likes />
                </Button>
                {(user?.result?.sub == post?.creator|| user?.result?._id == post?.creator)&& (

                <Button size={"small"} color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post