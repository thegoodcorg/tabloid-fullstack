import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetCommentById } from "../modules/commentManager";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { editComment } from "../modules/commentManager";


export const EditComment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [comment, setComment] = useState({})

    useEffect(() => {
        GetCommentById(id).then((res) => {
            setComment(res)
        })
    },[])

    return (
        <Form>
            <h3>Edit Comment</h3>
            <FormGroup>
                <strong>Subject</strong>
                <Input type="text" name="subject" id="title" placeholder={comment.subject} 
                    onChange={(e) => {
                        let copy = {...comment}
                        copy.subject = e.target.value
                        setComment(copy)
                    }}
                />
                 <strong>Content</strong>
                <Input type="text" name="content" id="content" placeholder={comment.content} 
                    onChange={(e) => {
                        let copy = {...comment}
                        copy.content = e.target.value
                        setComment(copy)
                    }}
                />
            </FormGroup>
            <Button className="btn btn-primary" onClick={() => {
                navigate(`/post/${comment.postId}`)
            }}>Cancel</Button>
            <Button className="btn btn-primary" onClick={() => {
                editComment(comment).then((r) => {
                    console.log(r)
                    navigate(`/post/${comment.postId}`)
                })

            }}>Save</Button>
        </Form>
    )
}