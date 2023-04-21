import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { CommentPreview } from "./CommentPreview";

export default function Post({ post }) {
    return (
        <Card key={post.id} className="m-4">
            <CardBody>
                <Link to={`/post/${post.id}`} >
                    <CardTitle tag='h5'>{post.title}</CardTitle>
                </Link>
                <CardSubtitle className="mb-2 text-muted"> Posted by: {post.userProfile?.displayName}</CardSubtitle>
                <CardSubtitle className="mb-2 text-muted"> Category: {post.category?.name}</CardSubtitle>
                <CommentPreview postId={post.id} />

            </CardBody>
        </Card>
    );
}
