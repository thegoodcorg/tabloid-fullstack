import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle, Button } from "reactstrap";
import { CommentPreview } from "./CommentPreview";



export default function Post({ post }) {

    // const [postDetails, setPostDetails] = useState({
    //     Title: post.Title,
    //     Content: post.Content,
    //     CategoryId: post.CategoryId,
    //     ImageLocation: post.ImageLocation,
    //     PublishDateTime: post.PublishDateTime
    // });

    const navigate = useNavigate();

    return (
        <Card key={post.id} className="m-4">
            <CardBody>
                <Link to={`/post/${post.id}`} >
                    <CardTitle tag='h5'>{post.title}</CardTitle>
                </Link>
                <CardSubtitle className="mb-2 text-muted"> Posted by: {post.userProfile?.displayName}</CardSubtitle>
                <CardSubtitle className="mb-2 text-muted"> Category: {post.category?.name}</CardSubtitle>
                <CommentPreview postId={post.id} />

                <Button className="m-2" onClick={() => navigate(`Edit/${post.id}`)}>Edit Post</Button>
            </CardBody>
        </Card>
    );
}
