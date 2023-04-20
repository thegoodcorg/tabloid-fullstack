import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody} from "reactstrap";
import { deleteTag, getTagById } from "../modules/tagManager";
import Tag from "./Tag";


const TagDelete = () => {
    const [tag, setTag] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTagById(id).then(setTag);
      }, []);
       
  return (
    <Card >
      <CardBody>
       <Tag tag={tag} key={tag.id}/>
          <button className="deleteBtn" onClick={ ()=> deleteTag(tag.id).then(() => navigate("/tag"))}>Confirm Delete</button>
          <button className="cancelBtn" onClick={ ()=> navigate("/tag")}>Cancel</button>
      </CardBody>
    </Card>
  );
};

export default TagDelete;





