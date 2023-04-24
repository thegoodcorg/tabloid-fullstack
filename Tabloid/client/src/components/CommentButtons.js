import React from "react";
import { deleteComment } from "../modules/commentManager";
import { useNavigate } from "react-router-dom";



export const CommentButtons = ({ commentId, getComments }) => {

    const navigate = useNavigate()
    const handleDeleteClick = (e) => {
        deleteComment(e)
            .then(() => {
                getComments()
            })
    }
    return <>
        <button onClick={() => {navigate(`/comment/edit/${commentId}`)}}>Edit</button>
        <button onClick={() => handleDeleteClick(commentId)}>Delete</button></>
}