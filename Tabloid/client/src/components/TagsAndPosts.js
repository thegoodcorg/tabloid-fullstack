import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { addPostTag } from "../modules/postManager";
import { getAllTags } from "../modules/tagManager";
import Tag from "./Tag";


const TagsAndPosts = () => {
  const [tags, setTags] = useState([]);
  const [postTag, setPostTag] = useState([]);
const navigate = useNavigate();

//make a new function in auth manager
    const getTags = () => {
    getAllTags().then(tags => setTags(tags));
  };


  useEffect(() => {
    getTags();
  }, []);  //only runs on the intial rendering of the page if dependency array is empty 


  return (
    <div className="container">

      <div className="row justify-content-center">
        {tags.map((tag) => (
            <>
          <Tag tag={tag} key={tag.id} />
          <Button className="btn" onClick={() => addPostTag(postTag.id).then(()=> navigate("/post"))}>Add Tag To Post</Button>
          </>
        ))}
      </div>
    </div>
  );
};

export default TagsAndPosts;