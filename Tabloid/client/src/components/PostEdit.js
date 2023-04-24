import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { editPost, getPostById } from '../modules/postManager';


const PostEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({});

    useEffect(() => {
        getPostById(id).then((p) => {
            setPost(p)
        })
    }, [])


    return (

        <Form>
            <h3>Edit Post</h3>
            <FormGroup>
                <strong >Title</strong>
                <Input type="text" name="title" id="title" placeholder={post.title}

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.title = evt.target.value
                        setPost(copy);
                    }} />

                <strong >Content</strong>
                <Input type="text" name="content" id="content" placeholder={post.content}

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.content = evt.target.value
                        setPost(copy);
                    }} />

                <strong>Category</strong>
                <Input type="text" name="category" id="category" placeholder={post.category?.name}

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.categoryId = parseInt(evt.target.value)
                        setPost(copy);
                    }} />

                <strong >Header Image URL</strong>
                <Input type="text" name="imageUrl" id="name" placeholder={post.imageLocation}

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.imageLocation = evt.target.value
                        setPost(copy);
                    }} />

                <strong >Publication Date</strong>
                <Input type="date" name="publishDate" id="publishDate" placeholder={post.publishDateTime}

                    onChange={(evt) => {
                        let copy = { ...post }
                        copy.publishDateTime = evt.target.value
                        setPost(copy);
                    }} />

            </FormGroup>
            <Button className="btn btn-primary" onClick={() => {
                navigate(`/post`)
            }}>Cancel</Button>
            <Button className="btn btn-primary" onClick={() => {
                editPost(post).then((r) => {

                    navigate(`/post/${id}`)
                })

            }}>Save</Button>
        </Form>
    );
};

export default PostEdit;
