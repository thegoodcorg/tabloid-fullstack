import { useEffect, useState } from "react"
import Post from "./Post"
import { useParams } from "react-router-dom"
import { getPostById } from "../modules/postManager";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { PostComments } from "./PostComments";
import { CommentForm } from "./CommentForm";

export default function PostDetails() {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getPostById(id).then((p) => {
            setPost(p)
        })

    }, [])

    return (
        <div>
            <Card className="m-4">
                <CardBody>
                    {/* <img src={`${post.imageLocation}`} alt="header image" /> */}
                    <strong>{post.title}</strong>
                    <p> Posted by: {post.userProfile?.displayName}</p>
                    <p>{post.content}</p>
                    <p> Posted On: {post.publishDateTime}</p>
                    <CommentForm />
                    <PostComments postId={id}/>

                </CardBody>
            </Card>
        </div>
    )
}