import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export default function Post({ post }) {
    return (
        <Card className="m-4">
            <CardBody>
                <Link to={`/post/${post.id}`} >
                    <strong>{post.title}</strong>
                </Link>
                <p> Posted by: {post.userProfile?.displayName}</p>
                <p> Category: {post.category?.name}</p>

            </CardBody>
        </Card>
    );
}
