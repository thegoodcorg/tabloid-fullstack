import React, { useState } from "react";
import { Button } from "reactstrap";
import { addComment } from "../modules/commentManager";
import { useNavigate, useParams } from "react-router-dom";


export const CommentForm = ({ getComments }) => {
    const [commentContent, setCommentContent] = useState({})

    let postId = useParams("id")["id"]

    return <>
        <input
            value={commentContent.content}
            type="field"
            placeholder="Leave a Comment!"
            onChange={(e) => {
                const copy = { ...commentContent }
                copy.content = e.target.value
                setCommentContent(copy)
            }}>

        </input>
        <div>
        <Button className="btn btn-primary" onClick={() => {
            const copy = { ...commentContent }
            copy.postId = postId
            addComment(copy).then((returnedComment) => {
                console.log(returnedComment)
                // navigate(`/post/${returnedComment.postId}`)
                getComments()
                setCommentContent({ content: "" })
            })

        }}>Submit</Button>
        </div>
        <br />
    </>
}

