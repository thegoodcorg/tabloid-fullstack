import React from "react";
import { Card, CardBody } from "reactstrap";
import { CommentPreview } from "./CommentPreview";

export default function Post({ post }) {
    return (
        <Card className="m-4">
            <CardBody>
                <strong>{post.title}</strong>
                <p> Posted by: {post.userProfile.displayName}</p>
                <p> Category: {post.category.name}</p>
                <CommentPreview postId={post.id} />

            </CardBody>
        </Card>
    );
}
