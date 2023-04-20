import { useEffect, useState } from "react";
import { getAllPosts } from "../modules/postManager";
import Post from "./Post";

export default function PostsDisplay() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllPosts().then(p => {

            setPosts(p)
        })
    }, [])

    return (
        <>
            <section>
                {
                    posts.map((post) => {
                        if (post.isApproved === true && new Date(post.publishDateTime) < Date.now()) {

                            return <Post post={post} />

                        }
                    })
                }
            </section>
        </>
    )
}