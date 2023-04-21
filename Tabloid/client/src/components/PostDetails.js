import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deletePost, getPostById } from "../modules/postManager";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { PostComments } from "./PostComments";
import { CommentForm } from "./CommentForm";
import { getPostComments } from "../modules/commentManager";

export default function PostDetails() {
    const [post, setPost] = useState({});
    const [commentsOnPost, setCommentsOnPost] = useState([])

    const { id } = useParams();

    useEffect(() => {
        getComments()
    }, [])

    useEffect(() => {
        getPostById(id).then((p) => {
            setPost(p)
        })

    }, [])

    const getComments = () => {
        getPostComments(id).then(c => {
            setCommentsOnPost(c)
        })
    }
    const navigate = useNavigate();
    return (
        <div>
            <Button className="m-4" onClick={() => {
                deletePost(id);
                navigate(-1);
            }}>Delete Post</Button>
            <Card className="m-4">
                <CardBody>
                    {/* <img src={`${post.imageLocation}`} alt="header image" /> */}
                    <CardTitle tag='h5'>{post.title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted"> Posted by: {post.userProfile?.displayName}</CardSubtitle>
                    <CardText className="m-4">{post.content}</CardText>
                    <CardSubtitle className="mb-2 text-muted"> Posted On: {post.publishDateTime}</CardSubtitle>
                    <CommentForm getComments={getComments} />
                    <PostComments commentsOnPost={commentsOnPost} />
                </CardBody>
            </Card>
        </div>
    )
}