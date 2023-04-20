import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addPost } from '../modules/postManager';


const PostForm = () => {


    const [post, setPost] = useState({
        Title: "",
        Content: "",
        CategoryId: 0,
        ImageLocation: "",
        PublishDateTime: ""
    });
    const navigate = useNavigate();

    return (
        <Form>
            <FormGroup>
                <strong for="title">Title</strong>
                <Input type="text" name="title" id="title" placeholder=""

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.Title = evt.target.value
                        setPost(copy);
                    }} />

                <strong for="content">Content</strong>
                <Input type="text" name="content" id="content" placeholder=""

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.Content = evt.target.value
                        setPost(copy);
                    }} />

                <strong for="category">Category</strong>
                <Input type="text" name="category" id="category" placeholder="Replace with SELECT dropdown"

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.CategoryId = evt.target.value
                        setPost(copy);
                    }} />

                <strong for="imageUrl">Header Image URL</strong>
                <Input type="text" name="imageUrl" id="name" placeholder="Optional"

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.ImageLocation = evt.target.value
                        setPost(copy);
                    }} />

                <strong for="publishDate">Publication Date</strong>
                <Input type="date" name="publishDate" id="publishDate" placeholder="Optional"

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.PublishDateTime = evt.target.value
                        setPost(copy);
                    }} />

            </FormGroup>
            <Button className="btn btn-primary" onClick={() => {
                addPost(post).then((r) => {
                    navigate(`/post/${r.id}`)
                })

            }}>Submit</Button>
        </Form>
    );
};

export default PostForm;
