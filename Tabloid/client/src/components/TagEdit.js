import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { getTagById, updateTag } from '../modules/tagManager';


const TagEdit = () => {

  const [tag, setTag] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTagById(id).then(setTag);
  }, []);


  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const tagCopy = { ...tag };

    tagCopy[key] = value;
    setTag(tagCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    updateTag(tag).then((p) => {
        // Navigate the user back to the home route
        navigate("/tag");
    });
  };

  if (!tag) {
    return null;
  }

  return (
    <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <textarea type="text" name="name" id="name" className='form-control'
          value={tag.name}
          onChange={handleInputChange} />
            
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>Save</Button>
      <Button className="btn btn-primary" onClick={() => navigate("/tag")}>Cancel</Button>
    </Form>
  );
};

export default TagEdit;
