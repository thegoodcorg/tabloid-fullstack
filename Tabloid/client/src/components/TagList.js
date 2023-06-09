import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getAllTags } from "../modules/tagManager";
import Tag from "./Tag";

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
          <button className="deleteBtn" onClick={ ()=> navigate(`delete/${tag.id}`)}>Delete</button>
          </>
        ))}
      </div>
      <Button onClick={() => navigate("add")}> Create a New Tag!</Button>
    </div>
  );
};

export default TagList;