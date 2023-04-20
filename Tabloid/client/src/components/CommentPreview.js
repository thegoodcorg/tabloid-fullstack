import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { getPostComments } from "../modules/commentManager";

export const CommentPreview = ({postId}) => {
const [commentsOnPost, setCommentsOnPost] = useState([])

useEffect(() => {
    getPostComments(postId).then(c => {
        setCommentsOnPost(c)
    })
}, [])
if(commentsOnPost.length == 1){
    return <div>There is {commentsOnPost.length} comment on this post.</div>
}
else {
    return <div>there are {commentsOnPost.length} comments on this post.</div>
}
}