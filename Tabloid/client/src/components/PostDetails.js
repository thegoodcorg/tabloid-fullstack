import { useEffect, useState } from "react"
import Post from "./Post"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../modules/postManager";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { PostComments } from "./PostComments";
import { CommentForm } from "./CommentForm";
import { getPostComments } from "../modules/commentManager";

export default function PostDetails() {
    const [post, setPost] = useState({});
    const [commentsOnPost, setCommentsOnPost] = useState([])

    const { id } = useParams();
    const navigate = useNavigate();

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

    return (
        <div>
            <Card className="m-4">
                <CardBody>
                    {/* <img src={`${post.imageLocation}`} alt="header image" /> */}
                    <strong>{post.title}</strong>
                    <p> Posted by: {post.userProfile?.displayName}</p>
                    <p>{post.content}</p>
                    <p> Posted On: {post.publishDateTime}</p>
                    <CommentForm getComments={getComments} />
                    <PostComments commentsOnPost={commentsOnPost} />

                    <PostComments postId={id}/>
                    
                    <Button onClick={()=>navigate("ManageTags")}>Manage Tags</Button>

                </CardBody>
            </Card>
        </div>
    )
}

//note to future Shane , add functionally to manage tags button 