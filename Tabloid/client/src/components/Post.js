import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { CommentPreview } from "./CommentPreview";

export default function Post({ post }) {
    return (
        <Card key={post.id} className="m-4">
            <CardBody>
                <Link to={`/post/${post.id}`} >
                    <strong>{post.title}</strong>
                </Link>
                <p> Posted by: {post.userProfile?.displayName}</p>
                <p> Category: {post.category?.name}</p>
                <strong>{post.title}</strong>
                <p> Posted by: {post.userProfile.displayName}</p>
                <p> Category: {post.category.name}</p>
                <CommentPreview postId={post.id} />

            </CardBody>
        </Card>
    );
}
