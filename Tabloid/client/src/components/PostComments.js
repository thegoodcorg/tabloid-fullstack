import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { deleteComment } from "../modules/commentManager";
import { me } from "../modules/authManager";
import { useParams } from "react-router-dom"
import { CommentButtons } from "./CommentButtons";



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

    return <><h5> Comments</h5> <br />
        {commentsOnPost.map(comment => {
            return <React.Fragment key={comment.id}>        <u>{comment.profile.displayName}</u> says <br />
                <li>

                    {comment.content}<br />
                    {comment.userProfileId === currentUser.id ? <CommentButtons getComments={getComments} commentId={comment.id} /> : ""}
                </li>
            </React.Fragment>
        })}
    </>
}