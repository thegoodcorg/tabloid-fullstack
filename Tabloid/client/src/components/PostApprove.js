import { useEffect, useState } from "react";
import { editPost, getAllPosts, getPostById } from "../modules/postManager";
import Post from "./Post";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { CommentPreview } from "./CommentPreview";

export default function PostApprove() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then((p) => {
            setPosts(p);
        });
    }, []);

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
        <>

            {posts.map((post) => {
                return <section key={post.id}>
                    <Card className="m-4">
                        <CardBody>

                            <Link to={`/post/${post.id}`} >
                                <CardTitle tag='h5'>{post.title}</CardTitle>
                            </Link>
                            <CardSubtitle className="mb-2 text-muted"> Estimated Read Time: {ReadTime(post)}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted"> Posted by: {post.userProfile?.displayName}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted"> Category: {post.category?.name}</CardSubtitle>
                            <CommentPreview postId={post.id} />

                            <Button className="m-2" onClick={() => {
                                { post.isApproved == true ? post.isApproved = false : post.isApproved = true }
                                editPost(post).then(navigate("/approvepost"))
                            }}>{post.isApproved == true ? "Un-approve Post" : "Approve Post"}</Button>
                        </CardBody>
                    </Card>
                </section>
            })}
        </>
    );
}
