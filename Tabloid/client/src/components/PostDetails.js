import { useEffect, useState } from "react"
import Post from "./Post"
import { useParams } from "react-router-dom"
import { getPostById } from "../modules/postManager";

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
            <Post post={post} />
        </div>
    )
}