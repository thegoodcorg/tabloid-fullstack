import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { getPostComments } from "../modules/commentManager";



export const PostComments = ({ postId }) => {
    const [commentsOnPost, setCommentsOnPost] = useState([])

    useEffect(() => {
        getPostComments(postId).then(c => {
            setCommentsOnPost(c)
        })
    }, [])

    return <> Comments {commentsOnPost.map(comment => {
        return <li key={comment.id}>
            {comment.content}
        </li>
    })}
    </>
}