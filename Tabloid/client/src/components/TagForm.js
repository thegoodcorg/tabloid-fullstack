import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addTag } from '../modules/tagManager';

const TagForm = ({ getTags }) => {
  const emptyTag = {
    name: '',
  };

  const [tag, setTag] = useState(emptyTag);
  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const tagCopy = { ...tag };

    tagCopy[key] = value;
    setTag(tagCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    addTag(tag).then((p) => {
        // Navigate the user back to the home route
        navigate("/tag");
    });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="Tag Name"
          value={tag.name}
          onChange={handleInputChange} />
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
    </Form>
  );
};

export default TagForm;

