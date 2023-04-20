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

for (const comment of commentsOnPost) {
    return <div key={comment.id}>{comment.message}</div>
    
}
}