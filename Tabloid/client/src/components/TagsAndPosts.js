
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { addPostTag, getPostById } from "../modules/postManager";
import { getAllTags } from "../modules/tagManager";


const TagsAndPosts = () => {
  const [tags, setTags] = useState([]);
  const [postTag, setPostTag] = useState(
    { postId: 0,
      tagId: 0
    });
  const [post, setPost] = useState([]);
  const { id } = useParams();
const navigate = useNavigate();

//make a new function in auth manager
    const getTags = () => {
    getAllTags().then(tags => setTags(tags));
  };

  const getPost = () => {
    getPostById(id).then(post => setPost(post));
  }

  useEffect(() => {
    getTags();
    getPost();
  }, []);  //only runs on the intial rendering of the page if dependency array is empty 
  

  const handleCheckboxChange = (e, tag) => {
    if (e.target.checked) {
        setPostTag({ postId: post.id, tagId: tag.id });
        addPostTag({ postId: post.id, tagId: tag.id });
    } else {

    }
  }

  return (

    <div className="container">
      <div className="row justify-content-center">

        {tags.map((tag) => (
            <div key={tag.id}>
                <input 
                    type="checkbox"
                    id={tag.id}
                    name={tag.name}
                    onChange={(e) => handleCheckboxChange(e,tag)}
                    />
                <label htmlFor={tag.id}>{tag.name}</label>
            </div>
        ))}
        <Button className="btn" onClick={() => navigate(`/post/${post.id}`)}>Save Tags</Button>
      </div>
    </div>
  );
};

export default TagsAndPosts;

