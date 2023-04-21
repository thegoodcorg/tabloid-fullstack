import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getPostComments } from "../modules/commentManager";

export const PostComments = ({ postId }) => {
    const [commentsOnPost, setCommentsOnPost] = useState([])

    useEffect(() => {
        getPostComments(postId).then(c => {
            setCommentsOnPost(c)
        })
    }, [])

    return <>
        <CardTitle tag='h5'>Comments</CardTitle>
        {
            commentsOnPost.map(comment => {
                return <li key={comment.id}>
                    {comment.content}
                </li>
            })
        }
    </>
}