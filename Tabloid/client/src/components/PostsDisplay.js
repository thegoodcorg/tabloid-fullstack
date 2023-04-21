import { useEffect, useState } from "react";
import { getAllPosts } from "../modules/postManager";
import Post from "./Post";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function PostsDisplay() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllPosts().then(p => {

            setPosts(p)
        })
    }, [])

    const navigate = useNavigate();
    return (
        <>
            <section>
                <Button className="m-4" onClick={() => navigate("postForm")}>New Post</Button>
                {
                    posts.map((post) => {
                        if (post.isApproved === true && new Date(post.publishDateTime) < Date.now()) {

                            return <Post key={post.id} post={post} />
                        }
                    })
                }
            </section>
        </>
    )
}