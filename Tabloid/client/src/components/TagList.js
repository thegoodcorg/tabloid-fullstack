import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteTag, getAllTags } from "../modules/tagManager";
import Tag from "./Tag";
import TagForm from "./TagForm";

const TagList = () => {
  const [tags, setTags] = useState([]);
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
          <button className="btn" onClick={() => navigate(`${tag.id}`)}>Edit</button>
          <button className="deleteBtn" onClick={ ()=> deleteTag(tag.id).then(() => {getTags();})}>Delete</button>
          </>
        ))}
      </div>
      <Button onClick={() => navigate("add")}> Create a New Tag!</Button>
    </div>
  );
};

export default TagList;