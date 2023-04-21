import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Card, CardBody } from "reactstrap";
import { deleteComment } from "../modules/commentManager";
import { me } from "../modules/authManager";
import { useParams } from "react-router-dom"



export const PostComments = ({ commentsOnPost, getComments }) => {
    const [currentUser, setCurrentUser] = useState({})
    
    const { id } = useParams();

    const handleDeleteClick = (e) => {
        deleteComment(e)
        .then(() => {
            getComments()
        })
    }
    useEffect(() => {
        me().then((res) => {
            setCurrentUser(res)
        })
    }, [])

    return <> Comments {commentsOnPost.map(comment => {
        return <> <li key={comment.id}>
            {comment.content} - by {comment.userProfileId} <br/> 
            {comment.userProfileId === currentUser.id ? <button onClick={() => {
                handleDeleteClick(comment.id)
            }}>Delete</button> : ""}
        </li>
        </>
    })}
=======
import { Card, CardBody, CardTitle } from "reactstrap";
import { getPostComments } from "../modules/commentManager";



export const PostComments = ({ commentsOnPost }) => {


    return <>
        <CardTitle tag='h5'>Comments</CardTitle>
        {
            commentsOnPost.map(comment => {
                return <li key={comment.id}>
                    {comment.content}
                </li>
            })
        }
>>>>>>> main
    </>
}