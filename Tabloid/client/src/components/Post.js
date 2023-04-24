import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle, Button } from "reactstrap";
import { CommentPreview } from "./CommentPreview";



export default function Post({ post }) {

    const ReadTime = (post) => {

        let words = post.content?.split(" ").length;

        let readTime = words / 265;

        let display = Math.round(readTime) + 1

        if (display != 1) {
            return `${display} minutes`
        }
        else {
            return `${display} minute`
        }
    }


    const navigate = useNavigate();

    return (
        <Card key={post.id} className="m-4">
            <CardBody>
                {/* <img src={`${post.imageLocation}`} alt="header image" /> */}
                <Link to={`/post/${post.id}`} >
                    <CardTitle tag='h5'>{post.title}</CardTitle>
                </Link>
                <CardSubtitle className="mb-2 text-muted"> Estimated Read Time: {ReadTime(post)}</CardSubtitle>
                <CardSubtitle className="mb-2 text-muted"> Posted by: {post.userProfile?.displayName}</CardSubtitle>
                <CardSubtitle className="mb-2 text-muted"> Category: {post.category?.name}</CardSubtitle>
                <CommentPreview postId={post.id} />

                <Button className="m-2" onClick={() => navigate(`Edit/${post.id}`)}>Edit Post</Button>
            </CardBody>
        </Card>
    );
}
