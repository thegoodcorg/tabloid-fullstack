import React, { useState } from "react";
import { Form } from "reactstrap";
import { me } from "../modules/authManager";

export const CommentForm = () => {
    const [commentContent, setCommentContent] = useState("")

    const userProfile = me()
    console.log(userProfile)
    const handleSaveClick = (event) => {
        event.preventDefault()

    }
    return <>
        <input
            type="field"
            placeholder="Leave a Comment!"
            onChange={(e) => {
                const copy = { ...commentContent }
                copy.content = e.target.value
                setCommentContent(copy)
            }}>

        </input>
        <button onClick={(e) => {
            handleSaveClick(e)
        }}>Submit.</button>
        <br />
    </>
}